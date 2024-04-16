import { IReferenceHistory } from "../../models/referenceHistory";
import { ReferenceHistoryEnum } from "../enums";

export type AddReferenceHistoryDto = Pick<IReferenceHistory, "messages"> & {
  referenceType: ReferenceHistoryEnum;
};

export type CreateReferenceHistoryDto = Pick<
  IReferenceHistory,
  "reference_type"
> &
  Partial<Pick<IReferenceHistory, "messages">>;
