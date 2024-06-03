"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProposalFromGemini = exports.generateProposalFromOpenAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const google_genai_1 = require("@langchain/google-genai");
const openai_1 = require("@langchain/openai");
const generateProposalFromOpenAI = (_a) => __awaiter(void 0, [_a], void 0, function* ({ context, prompt = "", }) {
    const ai = new openai_1.ChatOpenAI({
        maxTokens: 1024,
        verbose: true,
        maxRetries: 1,
        model: "gpt-3.5-turbo",
    });
    const template = prompts_1.PromptTemplate.fromTemplate(`
      Generate a Response in markdown format by Utilizing the following prompt and context: 
  
      Prompt --> {prompt}
      Context --> {context}
    `);
    const resp = yield template
        .pipe(ai)
        .pipe(new output_parsers_1.StringOutputParser())
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
});
exports.generateProposalFromOpenAI = generateProposalFromOpenAI;
const generateProposalFromGemini = (_b) => __awaiter(void 0, [_b], void 0, function* ({ context, prompt, }) {
    const llm = new google_genai_1.ChatGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY,
        model: "gemini-pro",
        maxOutputTokens: 2048,
        safetySettings: [
            {
                category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
        ],
    });
    const template = prompts_1.PromptTemplate.fromTemplate(`
      Generate a Response in markdown format by Utilizing the following prompt and context: 
  
      Prompt --> {prompt}
      Context --> {context}
    `);
    const chain = runnables_1.RunnableSequence.from([
        {
            prompt: ({ prompt }) => prompt,
            context: ({ context }) => context,
        },
        template,
        llm,
        new output_parsers_1.StringOutputParser(),
    ]);
    const resp = yield chain.invoke({
        context,
        prompt,
    });
    console.log(resp, "RESP________");
    return resp;
});
exports.generateProposalFromGemini = generateProposalFromGemini;
// `
// Generate a proposal in a cover letter in a Proper Markdown format and also add the list of services we provide.
// CONTEXT: {context}
// DESCRIPTION: {projectDescription}
// TITLE: {projectTitle}
//   `,
