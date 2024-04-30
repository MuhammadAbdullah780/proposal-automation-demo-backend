// import { Pinecone } from "@pinecone-database/pinecone";
// import { PineconeStore } from "@langchain/pinecone";
// import { ChatOpenAI, OpenAI, OpenAIEmbeddings } from "@langchain/openai";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { PromptTemplate } from "@langchain/core/prompts";
// import {
//   ConversationalRetrievalQAChain,
//   LLMChain,
//   loadQAStuffChain,
//   RetrievalQAChain,
// } from "langchain/chains";
// import { RunnableSequence } from "@langchain/core/runnables";
// import { formatDocumentsAsString } from "langchain/util/document";
// import { StringOutputParser } from "@langchain/core/output_parsers";

// const text = `
// Software Engineer with 2 years of MERN Stack experience

// I'm Muhammad Abdullah, a Software Engineer with a passion for building web applications. I graduated from the University of Karachi and have spent the past 2 years honing my skills in the MERN stack development (MongoDB, Express.js, React.js, Node.js).

// My Skillset:

// Front-End Development: HTML, CSS, JavaScript
// Back-End Development: Node.js, NestJS, Express.js, FastAPI
// Databases: MongoDB
// UI Frameworks: React, Next.js
// I'm a highly adaptable and eager learner, constantly seeking ways to expand my knowledge and tackle new challenges. I believe in strong collaboration and enjoy working with others to find innovative solutions.
// `;
// export const testFunc = async () => {
//   traintext();
//   // await applyRAG();
//   // await deleteAllRecordsFromSpecificIndex();
// };

// const traintext = async () => {
//   const pc = new Pinecone({
//     apiKey: "22c4fcc3-9d61-4735-96f0-f2d3e69f87bc",
//   });

//   // console.log(await pc.listIndexes());

//   const index = pc.Index(process.env.PINECONE_INDEX || "");

//   // console.log(index);

//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 200,
//     separators: ["\n\n", "\n", " ", ""],
//     chunkOverlap: 30,
//   });

//   const embeddings = new OpenAIEmbeddings();

//   const docs = await splitter.createDocuments([text]);

//   const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
//     pineconeIndex: index,
//     namespace: "yousuf-qadri-executive",
//   });

//   console.log(vectorStore, "VECTOR___STORE________");
// };

// const applyRAG = async () => {
//   const pc = new Pinecone({
//     apiKey: "22c4fcc3-9d61-4735-96f0-f2d3e69f87bc",
//   });

//   const llm = new ChatOpenAI();

//   const embeddings = new OpenAIEmbeddings();
//   const index = pc.Index(process.env.PINECONE_INDEX || "");

//   // const db = new PineconeStore(embeddings, {
//   //   namespace: "amaan-nadeem-executive",
//   //   pineconeIndex: index,
//   // });
//   const prompt = PromptTemplate.fromTemplate("{input}");

//   const store = new PineconeStore(embeddings, {
//     namespace: "amaan-nadeem-executive",
//     pineconeIndex: index,
//   });

//   const retriever = store.asRetriever({ k: 4 });

//   const questionPrompt = PromptTemplate.fromTemplate(
//     `
//     ----------------
//     CONTEXT: {context}
//     ----------------
//     CHAT HISTORY: {chatHistory}
//     ----------------
//     QUESTION: {question}
//     ----------------
//     Helpful Answer:`,
//   );

//   const chain = RunnableSequence.from([
//     {
//       question: (input: { question: string; chatHistory?: string }) =>
//         input.question,
//       chatHistory: (input: { question: string; chatHistory?: string }) =>
//         input.chatHistory ?? "",
//       context: async (input: { question: string; chatHistory?: string }) => {
//         const relevantDocs = await retriever.getRelevantDocuments(
//           input.question,
//         );
//         const serialized = formatDocumentsAsString(relevantDocs);
//         console.log(serialized, "SERIALIZED_____RECORD______");
//         return serialized;
//       },
//     },
//     questionPrompt,
//     llm,
//     new StringOutputParser(),
//   ]);

//   const questionOne = "what is my name?";

//   const resultOne = await chain.invoke({
//     question: questionOne,
//   });

//   console.log(resultOne, "RESULT___ONE____");

//   // const chan = RetrievalQAChain.fromLLM(llm, ret as any, {
//   //   prompt,
//   //   returnSourceDocuments: true,
//   // });

//   // const s = ConversationalRetrievalQAChain.fromLLM(llm, ret as any, {});

//   // console.log(chan, s, "asijagshasuqgw");

//   // console.log(chan.stream({ input: "Hi" }), "KAJSKJAKSAS");

//   // const store = await PineconeStore.fromExistingIndex(embeddings, {
//   //   namespace: "amaan-nadeem-executive",
//   //   pineconeIndex: index,
//   // });

//   // console.log(store);

//   // const retriever = store.asRetriever();

//   // console.log(await retriever.invoke("what does happy eats??"));

//   // const pineconeStore = new PineconeStore(embeddings, {
//   //   pineconeIndex: index,
//   //   namespace: "amaan-nadeem-executive",
//   // });

//   // const openaiApi = new ChatOpenAI();

//   // **Optional (if pre-embedding documents are not available):**
//   // Uncomment and replace with your document processing logic
//   // const documents = [/* your documents here */];
//   // const openaiEmbeddings = new OpenAIEmbeddings({ openaiApi });
//   // const documentEmbeddings = await openaiEmbeddings.embed(documents);

//   // const retriever = pineconeStore.asRetriever();

//   // const chain = new RetrievalQAChain({
//   //   // Combine documents using OpenAI (adjust model and temperature as needed)
//   //   combineDocumentsChain: new OpenAIEmbeddings({}),
//   //   retriever,
//   // });

//   // const chan = RetrievalQAChain.fromLLM(llm, retriever, {});

//   // const chian = ConversationalRetrievalQAChain.fromLLM(llm, retriever, {});

//   // const ca = RetrievalQAChain.fromLLM(llm, retriever as any, { prompt });
//   // console.log(ca.invoke({ inputKey: "what is my name??" }));

//   // const selfQueryRetriever = SelfQueryRetriever.fromLLM({
//   //   llm,
//   //   vectorStore,
//   //   documentContents,
//   //   attributeInfo,
//   //   /**
//   //    * We need to create a basic translator that translates the queries into a
//   //    * filter format that the vector store can understand. We provide a basic translator
//   //    * translator here, but you can create your own translator by extending BaseTranslator
//   //    * abstract class. Note that the vector store needs to support filtering on the metadata
//   //    * attributes you want to query on.
//   //    */
//   //   structuredQueryTranslator: new PineconeTranslator(),
//   // });

//   // const qa_chain = RetrievalQAChain.fromLLM(llm, retriever as any);

//   // console.log(qa_chain.invoke({ input: "What does happy eats?" }));
// };

// const deleteAllRecordsFromSpecificIndex = async () => {
//   const namespaceName = "amaan-nadeem-executive";

//   const pc = new Pinecone({
//     apiKey: "22c4fcc3-9d61-4735-96f0-f2d3e69f87bc",
//   });

//   const index = pc.Index(process.env.PINECONE_INDEX || "");

//   await index.namespace(namespaceName).deleteAll();
// };
