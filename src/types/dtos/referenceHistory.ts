import { IReferenceHistory } from "../../models/referenceHistory";

export type CreateReferenceHistoryDto = Pick<
  IReferenceHistory,
  "reference_type"
> &
  Pick<IReferenceHistory, "text">;

export type UpdateReferenceHistoryDto = Pick<IReferenceHistory, "text">;
