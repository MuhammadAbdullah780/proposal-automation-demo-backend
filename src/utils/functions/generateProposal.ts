import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { marked } from "marked";

type GenerateProposalArgs = {
  title: string;
  description: string;
  context: string;
};

export const generateProposal = async ({
  context,
  description,
  title,
}: GenerateProposalArgs) => {
  const ai = new ChatOpenAI({
    maxTokens: 1024,
    verbose: true,
    maxRetries: 1,
    model: "gpt-3.5-turbo",
  });

  const template = PromptTemplate.fromTemplate(
    `
        Generate a proposal in a cover letter in a rich text format and also add the list of services we provide.

          CONTEXT: {context}
          DESCRIPTION: {description}
          TITLE: {title}
        `,
  );

  const resp = await template.pipe(ai).pipe(new StringOutputParser()).invoke({
    context,
    description,
    title,
  });

  const resMark = await marked(resp);
  /**
   * For Streaming
   */
  //   for await (const chunk of resp) {
  //     console.log(chunk, "CHUNK____");
  //   }

  console.log({ normal: resp, markdown: resMark });
  return resMark;
};
