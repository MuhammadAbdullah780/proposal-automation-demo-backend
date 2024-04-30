// import { ChatOpenAI, OpenAI } from "@langchain/openai";
// import { Message } from "../types/common";
// import {
//   BufferMemory,
//   ChatMessageHistory,
//   ConversationSummaryMemory,
// } from "langchain/memory";
// import { HumanMessage, AIMessage } from "langchain/schema";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { LLMChain } from "langchain/chains";

// type ContructorArgs = {
//   automationType?: "proposal_automation" | "project_catalog_automation";
//   messages?: Message;
// };

// const dummyData = [
//   {
//     input: "Hi How are you",
//     output: "I am fine",
//   },
//   {
//     input: "My name is Abdullah",
//     output: "Ok",
//   },
// ];

// type ChatHistory = { prompt: string; reply: string };

// export class _OpenAIService {
//   //
//   #model = "gpt-3.5-turbo";
//   #temperature = 0.6;
//   #history?: ChatHistory[];

//   chatOpenAI: ChatOpenAI = new ChatOpenAI({
//     model: this.#model,
//     temperature: this.#temperature,
//     maxRetries: 1,
//     verbose: true,
//   });

//   constructor({
//     // automationType = "proposal_automation",
//     messages = [],
//   }: ContructorArgs = {}) {
//     // this.#history = this.#convertMessagesToHistory(messages);
//   }

//   async initPromptTemplate() {}

//   async prepareConversationBuffer() {
//     // Parsing the messages into input and output form

//     const pastMessages = [
//       {
//         input: "My name's Jonas",
//         output: "Nice to meet you, Jonas!",
//       },
//       {
//         input: "My name's Jonas",
//         output: "Nice to meet you, Jonas!",
//       },
//       {
//         input: "My name's Jonas",
//         output: "Nice to meet you, Jonas!",
//       },
//     ];

//     const buffer = new BufferMemory();

//     pastMessages.forEach((item) => {
//       buffer.chatHistory.addAIChatMessage(item.input);
//       buffer.chatHistory.addUserMessage(item.output);
//     });

//     // const memory = new BufferMemory();
//     // memory.chatHistory.addMessage(new HumanMessage("My name's Jonas"));

//     // console.log(buffer.chatHistory.getMessages(), "BUFFER_____");

//     const template = new PromptTemplate({
//       inputVariables: ["propsal_descripiton", "propsal_name"],
//       template: `generate a proposal with the help of the following informations
//          propsal_name: {propsal_name}
//          propsal_descripiton: {propsal_descripiton}
//       `,
//     });

//     // const res = await template.invoke({
//     //   propsal_descripiton: "React JS",
//     //   propsal_name: "React JS DESC",
//     // });

//     // console.log(res, "RES___");

//     // const prompt = template.format({
//     //   propsal_descripiton: "Requires a MERN Developer",
//     //   propsal_name: "React JS",
//     // });

//     const chain = new LLMChain({
//       llm: this.chatOpenAI,
//       memory: buffer,
//       prompt: template,
//     });

//     const outcome = await chain.predict({
//       propsal_descripiton: "Requires a MERN Developer",
//       propsal_name: "React JS",
//     });
//     console.log(outcome, "RES_______");
//   }

//   async generateDummyTextPrompt() {}

//   async predictOutcome() {}

//   #convertMessagesToHistory(arr: Message) {
//     const history: ChatHistory[] = [];

//     arr.forEach((item) => {
//       item.answers.forEach((answer) => {
//         history.push({
//           prompt: item.question,
//           reply: answer,
//         });
//       });
//     });

//     // console.log(history);
//     return history;
//   }

//   async #trash() {
//     const memory = new ConversationSummaryMemory({
//       memoryKey: "chat_history",
//       llm: new OpenAI({ model: "gpt-3.5-turbo", temperature: 0.6 }),
//     });

//     dummyData.forEach(async (item) => {
//       await memory.saveContext({ input: item.input }, { output: item.output });
//     });

//     const messages = await memory.chatHistory.getMessages();

//     const summary = await memory.predictNewSummary(messages, "");
//     console.log({ summary, messages, memory });
//   }
// }
