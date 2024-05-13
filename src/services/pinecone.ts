// import { OpenAIEmbeddings } from "@langchain/openai";
// import { PineconeStore } from "@langchain/pinecone";
// import { Index, Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
// import { Document } from "@langchain/core/documents";
// import { CustomError } from "../utils/classes/customError";
// import httpStatus from "http-status";

// type GetRetrieverArgs = {
//   k?: number;
//   namespace: string;
// };

// export class PineconeService {
//   #pinecone: Pinecone;
//   #index: Index<RecordMetadata>;
//   #embeddings: OpenAIEmbeddings;

//   constructor() {
//     this.#pinecone = new Pinecone({
//       apiKey: "22c4fcc3-9d61-4735-96f0-f2d3e69f87bc",
//     });
//     this.#index = this.#pinecone.Index(process.env.PINECONE_INDEX || "");
//     this.#embeddings = new OpenAIEmbeddings();
//   }

//   async deleteMultiple(namespace: string) {
//     const isUnknownNamespace = await this.isNamespaceExists(namespace);

//     if (!isUnknownNamespace) {
//       return new CustomError({
//         msg: "Namespace duplication occurs",
//         statusCode: httpStatus.NOT_IMPLEMENTED,
//       });
//     }

//     await this.#index.namespace(namespace).deleteAll();
//   }

//   async getRetriever({ namespace, k = 2 }: GetRetrieverArgs) {
//     return new PineconeStore(this.#embeddings, {
//       namespace,
//       pineconeIndex: this.#index,
//     }).asRetriever({ k });
//   }

//   async addDocuments(docs: Document<Record<string, any>>[], namespace: string) {
//     const isNamespaceExists = await this.isNamespaceExists(namespace);

//     if (isNamespaceExists) {
//       return new CustomError({
//         msg: "Namespace duplication occurs",
//         statusCode: httpStatus.NOT_IMPLEMENTED,
//       });
//     }

//     const vectorStore = await PineconeStore.fromDocuments(
//       docs,
//       this.#embeddings,
//       {
//         pineconeIndex: this.#index,
//         namespace,
//       },
//     );

//     return vectorStore;
//   }

//   async isNamespaceExists(namespace: string) {
//     const indexStats = await this.#index._describeIndexStats();
//     return !!Object.keys(indexStats?.namespaces || {}).includes(namespace);
//   }
// }
