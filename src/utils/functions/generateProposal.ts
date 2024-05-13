import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { marked } from "marked";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { RunnableSequence } from "@langchain/core/runnables";

type GenerateProposalArgs = {
  title: string;
  description: string;
  context: string;
};

type RunnableArgs = {
  context: string;
  projectTitle: string;
  projectDescription: string;
};

export const generateProposalFromOpenAI = async ({
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

  const resp = await template
    .pipe(ai as any)
    .pipe(new StringOutputParser())
    .invoke({
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

  return resMark;
};

export const generateProposalFromGemini = async ({
  context,
  description,
  title,
}: GenerateProposalArgs) => {
  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-pro",
    maxOutputTokens: 2048,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
  });

  const template = PromptTemplate.fromTemplate(
    `
    Generate a proposal in a cover letter in a rich text format and also add the list of services we provide.

    CONTEXT: {context}
    DESCRIPTION: {projectDescription}
    TITLE: {projectTitle}
      `,
  );
  const chain = RunnableSequence.from([
    {
      projectTitle: ({ projectTitle }: RunnableArgs) => projectTitle,
      projectDescription: ({ projectDescription }: RunnableArgs) =>
        projectDescription,
      context: ({ context }: RunnableArgs) => context,
    },
    template,
    llm,
    new StringOutputParser(),
  ]);

  const resp = await chain.invoke({
    context,
    projectDescription: description,
    projectTitle: title,
  });

  console.log(resp, "RESP________");
  return resp;
};
