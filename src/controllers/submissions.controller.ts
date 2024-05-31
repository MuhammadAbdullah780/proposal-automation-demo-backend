import httpStatus from "http-status";
import { ReferenceHistory } from "../models/referenceHistory";
import {
  CreateSubmissionDto,
  SubmitProposalFormDto,
} from "../types/dtos/formSubmission";
import {
  generateProposalFromGemini,
  generateProposalFromOpenAI,
} from "../utils/functions/generateProposal";
import { requestHandler } from "../utils/functions/requestHandler";
import { FormSubmissions } from "../models/formSubmissions";
import { ModalType } from "../types/enums";
import { Prompt } from "../models/prompts";
import { Types } from "mongoose";

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
        // description: payload.projectDescription,
        // title: payload.projectTitle,
        prompt: "",
      });
    } else {
      AIResponse = await generateProposalFromGemini({
        context: targetReference?.text || "",
        // description: payload.projectDescription,
        // title: payload.projectTitle,
        prompt: "",
      });
    }

    // Create a new document in mongodb in a form submission collection
    const createdRecord = await FormSubmissions.create({
      payload,
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
    const { generated_from }: FormSubmissionQueryDto = req?.query || {};

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
              // ...(search_query
              //   ? {
              //       $or: [
              //         {
              //           "payload.project_title": new RegExp(search_query, "i"),
              //         },
              //       ],
              //     }
              //   : {}),
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

export const createSubmission = requestHandler(
  async ({ req, raiseException }) => {
    console.log("THIS__FUNC___CALLED_______");

    // Variables
    const payload: CreateSubmissionDto = req.body;
    let AIResponse: string;

    console.log(payload, "PAYLOAD_______");

    // Validating Reference Type
    const targetReference = await ReferenceHistory.findOne({
      reference_type: payload.referenceType,
    }).lean(true);
    if (!targetReference) {
      return raiseException(
        "No such record found with the given reference type",
        httpStatus.NOT_FOUND,
      );
    }

    // Validating Prompt
    const targetedPrompt = await Prompt.findById(
      new Types.ObjectId(payload?.promptType),
    ).lean(true);
    if (!targetedPrompt) {
      return raiseException(
        "No such record found with the given Prompt type",
        httpStatus.NOT_FOUND,
      );
    }

    // Do some work regarding the prompt
    const variables = targetedPrompt?.variables || [];
    let template = targetedPrompt?.template;

    variables?.forEach((elem) => {
      template = template?.replace(
        `{${elem}}`,
        payload?.variables?.[elem] || "",
      );
    });

    console.log(
      {
        variables,
        template,
        payload,
      },
      "NORMAL___CONFIG",
    );

    // Ask openai to generate proposal
    if (payload?.llm === ModalType.CHAT_GPT) {
      AIResponse = await generateProposalFromOpenAI({
        context: targetReference?.text || "",
        prompt: template || "",
      });
    } else {
      AIResponse = await generateProposalFromGemini({
        context: targetReference?.text || "",
        prompt: template || "",
      });
    }

    // Create a new document in mongodb in a form submission collection
    const createdRecord = await FormSubmissions.create({
      payload: {
        project_title: "",
        project_description: "",
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

    return {
      data: {
        aiMessage: AIResponse,
        record: createdRecord,
      },
      message: "Successfully submitted proposal",
    };
  },
);
