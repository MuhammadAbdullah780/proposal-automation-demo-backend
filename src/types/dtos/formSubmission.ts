import { ReferenceHistoryEnum } from "../enums";

export type SubmitProposalFormDto = {
  projectTitle: string;
  projectDescription: string;
  referenceType: ReferenceHistoryEnum;
};
