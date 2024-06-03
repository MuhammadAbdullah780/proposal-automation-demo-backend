import { ModalType, ReferenceHistoryEnum } from "../enums";

export type SubmitProposalFormDto = {
  projectTitle: string;
  projectDescription: string;
  referenceType: ReferenceHistoryEnum;
  llm: ModalType;
};

export type CreateSubmissionDto = {
  referenceType: string;
  llm: ModalType;
  promptType: string;
  variables: Record<string, string>;
};
