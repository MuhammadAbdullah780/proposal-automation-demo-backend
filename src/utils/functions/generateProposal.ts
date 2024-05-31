import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

type GenerateProposalArgs = {
  context: string;
  prompt: string;
};

type RunnableArgs = {
  context: string;
  prompt: string;
};

export const generateProposalFromOpenAI = async ({
  context,
  prompt = "",
}: GenerateProposalArgs) => {
  const ai = new ChatOpenAI({
    maxTokens: 1024,
    verbose: true,
    maxRetries: 1,
    model: "gpt-3.5-turbo",
  });

  const template = PromptTemplate.fromTemplate(
    `
      Generate a Response in markdown format by Utilizing the following prompt and context: 
  
      Prompt --> {prompt}
      Context --> {context}
    `,
  );

  const resp = await template
    .pipe(ai as any)
    .pipe(new StringOutputParser())
    .invoke({
      context,
      prompt,
    });

  // const resMark = await marked(resp);
  /**
   * For Streaming
   */
  //   for await (const chunk of resp) {
  //     console.log(chunk, "CHUNK____");
  //   }

  return resp;
};

export const generateProposalFromGemini = async ({
  context,
  prompt,
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
      Generate a Response in markdown format by Utilizing the following prompt and context: 
  
      Prompt --> {prompt}
      Context --> {context}
    `,
  );

  const chain = RunnableSequence.from([
    {
      prompt: ({ prompt }: RunnableArgs) => prompt,
      context: ({ context }: RunnableArgs) => context,
    },
    template,
    llm,
    new StringOutputParser(),
  ]);

  const resp = await chain.invoke({
    context,
    prompt,
  });

  console.log(resp, "RESP________");
  return resp;
};

// `
// Generate a proposal in a cover letter in a Proper Markdown format and also add the list of services we provide.

// CONTEXT: {context}
// DESCRIPTION: {projectDescription}
// TITLE: {projectTitle}
//   `,
