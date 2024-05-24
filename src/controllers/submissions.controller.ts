import httpStatus from "http-status";
import { ReferenceHistory } from "../models/referenceHistory";
import { SubmitProposalFormDto } from "../types/dtos/formSubmission";
import {
  generateProposalFromGemini,
  generateProposalFromOpenAI,
} from "../utils/functions/generateProposal";
import { requestHandler } from "../utils/functions/requestHandler";
import { FormSubmissions } from "../models/formSubmissions";
import { ModalType } from "../types/enums";

export const submitProposalForm = requestHandler(
  async ({ req, raiseException }) => {
    const payload: SubmitProposalFormDto = req.body;

    console.log("req__.body", payload);

    // Check if record exists
    const targetReference = await ReferenceHistory.findOne({
      reference_type: payload.referenceType,
    }).lean(true);

    if (!targetReference) {
      return raiseException(
        "No such record found with the given reference type",
        httpStatus.NOT_FOUND,
      );
    }

    let AIResponse: string;

    // Ask openai to generate proposal
    if (payload?.llm === ModalType.CHAT_GPT) {
      AIResponse = await generateProposalFromOpenAI({
        context: targetReference?.text || "",
        description: payload.projectDescription,
        title: payload.projectTitle,
      });
    } else {
      AIResponse = await generateProposalFromGemini({
        context: targetReference?.text || "",
        description: payload.projectDescription,
        title: payload.projectTitle,
      });
    }

    // Create a new document in mongodb in a form submission collection
    const createdRecord = await FormSubmissions.create({
      payload: {
        project_title: payload.projectTitle,
        project_description: payload.projectDescription,
      },
      generated_from: payload?.llm,
      response: AIResponse,
    });

    if (!createdRecord) {
      return raiseException(
        "Error Occured while creating the record",
        httpStatus.NOT_IMPLEMENTED,
      );
    }

    console.log(
      {
        targetReference,
        payload,
        AIResponse,
        createdRecord,
      },
      "REQUEST___INFO",
    );

    return {
      data: {
        aiMessage: AIResponse,
        record: createdRecord,
      },
      message: "Successfully submitted proposal",
    };
  },
);

export const submitProjectCatalogForm = requestHandler(async () => {
  return {
    data: {},
    message: "",
  };
});

type FormSubmissionQueryDto = {
  generated_from?: string;
  search_query?: string;
};

export const fetchSubmissions = requestHandler(
  async ({ raiseException, req }) => {
    const { generated_from, search_query }: FormSubmissionQueryDto =
      req?.query || {};

    console.log(req.query, "FILTER__APPLIED");

    const data = await FormSubmissions.aggregate([
      {
        $match: {
          $and: [
            {
              ...(generated_from
                ? {
                    generated_from,
                  }
                : {}),
              ...(search_query
                ? {
                    $or: [
                      {
                        "payload.project_title": new RegExp(search_query, "i"),
                      },
                    ],
                  }
                : {}),
            },
          ],
        },
      },
    ]);

    console.log(data, "DATA_____");

    if (!data?.length) {
      raiseException("No Records Found", httpStatus.NO_CONTENT);
    }

    return {
      data,
      message: "Successfully fetched the submissions",
    };
  },
);
