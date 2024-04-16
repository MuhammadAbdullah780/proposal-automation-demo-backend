/**
 * ! Still working on this file
 */

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

// export class OpenAIService {
//   //
//   openai: ChatOpenAI = new ChatOpenAI({
//     model: "gpt-3.5-turbo",
//     temperature: 0.6,
//     maxRetries: 1,
//     verbose: true,
//   });
//   buffer?: BufferMemory;

//   constructor({
//     automationType = "proposal_automation",
//     messages = [],
//   }: ContructorArgs = {}) {
//     this.prepareConversationBuffer();
//   }

//   async initPromptTemplate() {}

//   async prepareConversationBuffer() {
//     // Parsing the messages into input and output form

//     const pastMessages = [
//       new HumanMessage("My name's Jonas"),
//       new AIMessage("Nice to meet you, Jonas!"),
//     ];

//     this.buffer = new BufferMemory({
//       chatHistory: new ChatMessageHistory(pastMessages),
//     });

//     console.log(this.buffer.chatHistory.getMessages(), "BUFFER_____");

//     const template = new PromptTemplate({
//       inputVariables: ["propsal_descripiton", "propsal_name"],
//       template: `generate a proposal with the help of the following informations
//          propsal_name: {propsal_name}
//          propsal_descripiton: {propsal_descripiton}
//       `,
//     });

//     const chain = new LLMChain({
//       llm: this.openai,
//       prompt: template,
//       memory: this.buffer,
//     });

//     const outcome = await chain.invoke("");

//     console.log(outcome);
//   }

//   async generateDummyTextPrompt() {}

//   async predictOutcome() {}

//   #convertMessagesToBuffer() {}

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

// /?
/**
 * Python work for better understanding
 *
 */

// from langchain.chains.conversation.base import ConversationChain
// from langchain_openai import ChatOpenAI
// from langchain.memory import ConversationBufferWindowMemory
// from typing import Any, List

// class ChatbotAI:
//     history_messages: List[Any]
//     model: ChatOpenAI

//     def __init__(
//         self,
//         message_history=[],
//         model_name: str = "gpt-3.5-turbo",
//         temperature: float | int = 0.6,
//     ):
//         self.model = ChatOpenAI(
//             model=model_name,
//             temperature=temperature,
//             max_retries=1,
//             streaming=True,
//             verbose=True,
//         )
//         self.history_messages = message_history

//     def predict_outcome(self, prompt: str) -> str:
//         # Memory
//         buffer = ConversationBufferWindowMemory(return_messages=True, k=2)

//         # Prepending History with memory
//         self._merge_buffer_with_history(memory=buffer)

//         # Chain
//         chain = ConversationChain(
//             llm=self.model,
//             verbose=True,
//             memory=buffer,
//         )

//         # Predict a response
//         result = chain.predict(input=prompt)
//         return result

//     def predict_outcome_using_rag(self) -> str:
//         return ""

//     def _merge_buffer_with_history(
//         self,
//         memory: ConversationBufferWindowMemory,
//     ) -> None:

//         if not len(self.history_messages):
//             return

//         # Saving messages to buffer
//         for item in self.history_messages:
//             memory.save_context(
//                 {"input": item["prompt"]},
//                 {"output": item["reply"]},
//             )
