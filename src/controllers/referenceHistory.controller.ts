import httpStatus from "http-status";
import {
  IReferenceHistory,
  ReferenceHistory,
} from "../models/referenceHistory";
import {
  AddReferenceHistoryDto,
  CreateReferenceHistoryDto,
} from "../types/dtos/referenceHistory";
import { ReferenceHistoryEnum } from "../types/enums";
import { requestHandler } from "../utils/functions/requestHandler";
import { DbRepository } from "../services/dbRepository";
import { checkInvalidValuesFromEnum } from "../utils/functions";

export const fetchReferenceHistory = requestHandler(
  async ({ req, raiseException }) => {
    //
    const referenceType = req.query?.reference_type as ReferenceHistoryEnum;
    const isInvalidReferenceType = !!(
      referenceType &&
      checkInvalidValuesFromEnum(ReferenceHistoryEnum, referenceType)
    );

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

export const appendMessagesToReferenceHistory = requestHandler(
  async ({ req, raiseException }) => {
    const body: AddReferenceHistoryDto = req.body;
    const isInvalidReferenceType = !!(
      body?.referenceType &&
      checkInvalidValuesFromEnum(ReferenceHistoryEnum, body?.referenceType)
    );

    // Check for invalid reference type
    if (isInvalidReferenceType) {
      return raiseException(
        "Invalid Reference type",
        httpStatus.NOT_ACCEPTABLE,
      );
    }

    const fetchedRecord = await ReferenceHistory.findOne({
      reference_type: body?.referenceType,
    });

    //
    body.messages.forEach((item) => {
      fetchedRecord?.messages.forEach((record) => {
        if (new RegExp(record.question, "i").test(item.question)) {
          record.answers = [...record.answers, ...item.answers];
        } else {
          fetchedRecord.messages.push(item);
        }
      });
    });

    const updatedRecord = await ReferenceHistory.findOneAndUpdate(
      { reference_type: body?.referenceType },
      { messages: fetchedRecord?.messages },
      { new: true },
    );

    if (!updatedRecord) {
      return raiseException(
        "Error Occured while updating the record",
        httpStatus.NOT_IMPLEMENTED,
      );
    }

    return {
      data: updatedRecord,
      message: "Successfully added new messages",
    };
  },
);

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
