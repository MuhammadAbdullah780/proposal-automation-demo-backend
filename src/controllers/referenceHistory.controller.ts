import httpStatus from "http-status";
import {
  IReferenceHistory,
  ReferenceHistory,
} from "../models/referenceHistory";
import { DbRepository } from "../services/dbRepository";
import { ReferenceHistoryService } from "../services/referenceHistory";
import {
  CreateReferenceHistoryDto,
  UpdateReferenceHistoryDto,
} from "../types/dtos/referenceHistory";
import { ReferenceHistoryEnum } from "../types/enums";
import { requestHandler } from "../utils/functions/requestHandler";
import { Types } from "mongoose";

export const fetchReferenceHistory = requestHandler(
  async ({ req, raiseException }) => {
    //
    const service = new ReferenceHistoryService();
    const referenceType = req.query?.reference_type as ReferenceHistoryEnum;
    const isInvalidReferenceType =
      service.checkForInvalidReferenceType(referenceType);

    //
    if (isInvalidReferenceType) {
      return raiseException(
        "Invalid Reference type",
        httpStatus.NOT_ACCEPTABLE,
      );
    }

    const data = await ReferenceHistory.find({
      ...(referenceType ? { reference_type: referenceType } : {}),
    }).lean(true);

    return {
      data,
      message: "Successfully fetched the reference history",
    };
  },
);

export const fetchSpecificReference = requestHandler(
  async ({ req, raiseException }) => {
    const identifier = req.params.referenceId as string;

    const fetchedReference = await ReferenceHistory.findById(identifier);

    if (!fetchedReference) {
      raiseException(
        "The refreence you are trying to update is not included in our record",
        httpStatus.NOT_FOUND,
      );
    }

    return {
      data: fetchedReference!,
      message: "Fetched the relevant reference",
    };
  },
);

// export const appendMessagesToReferenceHistory = requestHandler(
//   async ({ req, raiseException }) => {
//     //
//     const service = new ReferenceHistoryService();
//     const body = req.body;

//     const isInvalidReferenceType = service.checkForInvalidReferenceType(
//       body?.referenceType,
//     );

//     // Check for invalid reference type
//     if (isInvalidReferenceType) {
//       return raiseException(
//         "Invalid Reference type",
//         httpStatus.NOT_ACCEPTABLE,
//       );
//     }

//     const fetchedRecord = await ReferenceHistory.findOne({
//       reference_type: body?.referenceType,
//     });

//     if (!fetchedRecord) {
//       return raiseException(
//         "History for particular reference not found",
//         httpStatus.NOT_FOUND,
//       );
//     }

//     // const messages = service.removeDuplicateMessages(
//     //   fetchedRecord?.messages || [],
//     //   body?.messages,
//     // );

//     // const updatedRecord = await ReferenceHistory.findOneAndUpdate(
//     //   { reference_type: body?.referenceType },
//     //   { $set: { messages } },
//     //   { new: true },
//     // );

//     // if (!updatedRecord) {
//     //   return raiseException(
//     //     "Error Occured while updating the record",
//     //     httpStatus.NOT_IMPLEMENTED,
//     //   );
//     // }

//     return {
//       data: {},
//       message: "Successfully added new messages",
//     };
//   },
// );

export const createReferenceHistory = requestHandler(
  async ({ req, raiseException }) => {
    //
    const repo = new DbRepository<IReferenceHistory>(ReferenceHistory);
    const body: CreateReferenceHistoryDto = req.body;

    const isExists = await repo.isDocExits({
      filter: { reference_type: body?.reference_type },
    });

    if (isExists) {
      return raiseException(
        "This Reference History already exists",
        httpStatus.CONFLICT,
      );
    }

    const createdData = await ReferenceHistory.create(body);

    return {
      data: createdData,
      isSuccess: true,
      message: "Successfully created new Reference History",
    };
  },
  { responseStatus: 201 },
);

export const updateReferenceHistory = requestHandler(
  async ({ req, raiseException }) => {
    // const service = new ReferenceHistoryService();
    const repo = new DbRepository<IReferenceHistory>(ReferenceHistory);
    const referenceType = req.params?.referenceType;
    const { text = "", rich_text = "" }: UpdateReferenceHistoryDto = req.body;

    // Check if record exists
    const isDocExists = await repo.isDocExits({
      filter: {
        reference_type: referenceType,
      },
    });

    if (!isDocExists) {
      return raiseException(
        "History for particular reference not found",
        httpStatus.NOT_FOUND,
      );
    }

    const updatedDoc = await ReferenceHistory.findOneAndUpdate(
      { reference_type: referenceType },
      { text, rich_text },
      { new: true, runValidators: true },
    );

    if (!updatedDoc) {
      raiseException(
        "Error Occured while updating the reference",
        httpStatus.NOT_MODIFIED,
      );
    }

    return {
      data: updatedDoc,
      message: "Successfully updated the reference",
    };
  },
);

export const listReferences = requestHandler(async () => {
  console.log("HI___");
  const referencesListing = await ReferenceHistory.aggregate([
    {
      $project: {
        // _id: 0,
        reference_type: 1,
      },
    },
  ]);

  return {
    data: referencesListing,
    message: "Successfully fetched possibble References",
  };
});

export const deleteReference = requestHandler(
  async ({ req, raiseException }) => {
    const id: string | Types.ObjectId = new Types.ObjectId(req.params?.id);
    const repo = new DbRepository<IReferenceHistory>(ReferenceHistory);

    console.log(id, "ID_____");

    const isDocExists = repo.isDocExits({ filter: { _id: id } });

    if (!isDocExists) {
      raiseException(
        "The record you are trying to delete is not exists in our record.",
        httpStatus.NOT_FOUND,
      );
    }

    const deletedRecord = await ReferenceHistory.findByIdAndDelete(id);

    if (!deletedRecord) {
      raiseException(
        "Error occured while deleting the record",
        httpStatus.NOT_IMPLEMENTED,
      );
    }

    return {
      data: deletedRecord!,
      message: "Record deleted Successfully",
    };
  },
);
