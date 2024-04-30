import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import httpStatus from "http-status";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { formatDocumentsAsString } from "langchain/util/document";
import { CustomError } from "../utils/classes/customError";
import { PineconeService } from "./pinecone";

/**
 * Abstracts
 */
abstract class OpenAIServiceAbstract {
  abstract invoke(arg: InvokeArgs): Promise<any>;
  abstract trainText(arg: TrainTextArgs): Promise<any>;
}

/**
 * Typings
 */
type Temperature = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
type GptModel = "gpt-3.5-turbo" | "gpt-4";

type BaseRunnableChainInput = {
  query: string;
};
type ProposalRunnableChainArgs = {
  projectTitle: string;
  projectDescription: string;
};

type TrainTextArgs = {
  namespace: string;
  textToTrain: string;
};
type InvokeArgs = {
  namespace: string;
  query: string;
};

type GenerateProposalArgs = {
  namespace: string;
  query: string;
};

export class OpenAIService implements OpenAIServiceAbstract {
  constructor(
    private readonly model: GptModel = "gpt-3.5-turbo",
    private readonly temperature: Temperature = 0.6,
  ) {}

  async invoke({ namespace, query }: InvokeArgs) {
    const isNonActiveNamespace =
      !(await new PineconeService().isNamespaceExists(namespace));

    if (isNonActiveNamespace) {
      return new CustomError({
        msg: "No Namespace Exists with that name",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const llm = new ChatOpenAI({
      model: this.model,
      temperature: this.temperature,
      verbose: true,
      maxRetries: 2,
    });

    // Initiating Prompt Template
    const template = PromptTemplate.fromTemplate(
      `
        Answer the following query based on the context you have:
        
        QUERY: {query}
        CONTEXT: {context}
      `,
    );

    // Retriever
    const retriever = await new PineconeService().getRetriever({ namespace });

    // Runnable Sequence
    const chain = RunnableSequence.from([
      {
        //
        query: async ({ query }: BaseRunnableChainInput) => query,
        //
        context: async ({ query }: BaseRunnableChainInput) => {
          const relevantDocs = await retriever.getRelevantDocuments(query);
          const serialized = formatDocumentsAsString(relevantDocs);
          console.log(serialized, "SERIALIZED_____RECORD______");
          return serialized;
        },
      },
      template,
      llm,
      new StringOutputParser(),
    ]);

    return await chain.invoke({ query });
  }

  async trainText({ namespace, textToTrain }: TrainTextArgs) {
    const pineconeService = new PineconeService();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      separators: ["\n\n", "\n", " ", "."],
      chunkOverlap: 30,
    });

    const docs = await splitter.createDocuments([textToTrain]);

    return await pineconeService.addDocuments(docs, namespace);
  }

  async generateProposal({ namespace, query }: GenerateProposalArgs) {
    const isNonActiveNamespace =
      !(await new PineconeService().isNamespaceExists(namespace));

    if (isNonActiveNamespace) {
      return new CustomError({
        msg: "No Namespace Exists with that name",
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const llm = new ChatOpenAI({
      model: this.model,
      temperature: this.temperature,
      verbose: true,
      maxRetries: 2,
    });

    // Initiating Prompt Template
    const template = PromptTemplate.fromTemplate(
      `
        Generate a proposal based on the following information:
        =======================================================
        CONTEXT: {context}
        PROJECT_TITLE: {projectTitle}
        PROJECT_DESCRIPTION: {projectDescripiton}
      `,
    );

    // Retriever
    const retriever = await new PineconeService().getRetriever({ namespace });

    // Runnable Sequence
    const chain = RunnableSequence.from([
      {
        //
        projectTitle: async ({ projectTitle }: ProposalRunnableChainArgs) =>
          projectTitle,
        //
        projectDescription: async ({
          projectDescription,
        }: ProposalRunnableChainArgs) => projectDescription,
        //
        context: async () => {
          const relevantDocs = await retriever.getRelevantDocuments("");
          const serialized = formatDocumentsAsString(relevantDocs);
          console.log(serialized, "SERIALIZED_____RECORD______");
          return serialized;
        },
      },
      template,
      llm,
      new StringOutputParser(),
    ]);

    return await chain.invoke({ query });
  }
}
