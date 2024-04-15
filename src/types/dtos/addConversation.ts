export type AddConversationDto = {
  title: string;
  messages: {
    question: string;
    answer: string[];
  }[];
};
