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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmission = exports.fetchSubmissions = exports.submitProjectCatalogForm = exports.submitProposalForm = void 0;
const http_status_1 = __importDefault(require("http-status"));
const referenceHistory_1 = require("../models/referenceHistory");
const generateProposal_1 = require("../utils/functions/generateProposal");
const requestHandler_1 = require("../utils/functions/requestHandler");
const formSubmissions_1 = require("../models/formSubmissions");
const enums_1 = require("../types/enums");
const prompts_1 = require("../models/prompts");
const mongoose_1 = require("mongoose");
exports.submitProposalForm = (0, requestHandler_1.requestHandler)((_a) => __awaiter(void 0, [_a], void 0, function* ({ req, raiseException }) {
    const payload = req.body;
    console.log("req__.body", payload);
    // Check if record exists
    const targetReference = yield referenceHistory_1.ReferenceHistory.findOne({
        reference_type: payload.referenceType,
    }).lean(true);
    if (!targetReference) {
        return raiseException("No such record found with the given reference type", http_status_1.default.NOT_FOUND);
    }
    let AIResponse;
    // Ask openai to generate proposal
    if ((payload === null || payload === void 0 ? void 0 : payload.llm) === enums_1.ModalType.CHAT_GPT) {
        AIResponse = yield (0, generateProposal_1.generateProposalFromOpenAI)({
            context: (targetReference === null || targetReference === void 0 ? void 0 : targetReference.text) || "",
            // description: payload.projectDescription,
            // title: payload.projectTitle,
            prompt: "",
        });
    }
    else {
        AIResponse = yield (0, generateProposal_1.generateProposalFromGemini)({
            context: (targetReference === null || targetReference === void 0 ? void 0 : targetReference.text) || "",
            // description: payload.projectDescription,
            // title: payload.projectTitle,
            prompt: "",
        });
    }
    // Create a new document in mongodb in a form submission collection
    const createdRecord = yield formSubmissions_1.FormSubmissions.create({
        payload,
        generated_from: payload === null || payload === void 0 ? void 0 : payload.llm,
        response: AIResponse,
    });
    if (!createdRecord) {
        return raiseException("Error Occured while creating the record", http_status_1.default.NOT_IMPLEMENTED);
    }
    console.log({
        targetReference,
        payload,
        AIResponse,
        createdRecord,
    }, "REQUEST___INFO");
    return {
        data: {
            aiMessage: AIResponse,
            record: createdRecord,
        },
        message: "Successfully submitted proposal",
    };
}));
exports.submitProjectCatalogForm = (0, requestHandler_1.requestHandler)(() => __awaiter(void 0, void 0, void 0, function* () {
    return {
        data: {},
        message: "",
    };
}));
exports.fetchSubmissions = (0, requestHandler_1.requestHandler)((_b) => __awaiter(void 0, [_b], void 0, function* ({ raiseException, req }) {
    const { generated_from } = (req === null || req === void 0 ? void 0 : req.query) || {};
    console.log(req.query, "FILTER__APPLIED");
    const data = yield formSubmissions_1.FormSubmissions.aggregate([
        {
            $match: {
                $and: [
                    Object.assign({}, (generated_from
                        ? {
                            generated_from,
                        }
                        : {})),
                ],
            },
        },
    ]);
    console.log(data, "DATA_____");
    if (!(data === null || data === void 0 ? void 0 : data.length)) {
        raiseException("No Records Found", http_status_1.default.NO_CONTENT);
    }
    return {
        data,
        message: "Successfully fetched the submissions",
    };
}));
exports.createSubmission = (0, requestHandler_1.requestHandler)((_c) => __awaiter(void 0, [_c], void 0, function* ({ req, raiseException }) {
    console.log("THIS__FUNC___CALLED_______");
    // Variables
    const payload = req.body;
    let AIResponse;
    console.log(payload, "PAYLOAD_______");
    // Validating Reference Type
    const targetReference = yield referenceHistory_1.ReferenceHistory.findOne({
        reference_type: payload.referenceType,
    }).lean(true);
    if (!targetReference) {
        return raiseException("No such record found with the given reference type", http_status_1.default.NOT_FOUND);
    }
    // Validating Prompt
    const targetedPrompt = yield prompts_1.Prompt.findById(new mongoose_1.Types.ObjectId(payload === null || payload === void 0 ? void 0 : payload.promptType)).lean(true);
    if (!targetedPrompt) {
        return raiseException("No such record found with the given Prompt type", http_status_1.default.NOT_FOUND);
    }
    // Do some work regarding the prompt
    const variables = (targetedPrompt === null || targetedPrompt === void 0 ? void 0 : targetedPrompt.variables) || [];
    let template = targetedPrompt === null || targetedPrompt === void 0 ? void 0 : targetedPrompt.template;
    variables === null || variables === void 0 ? void 0 : variables.forEach((elem) => {
        var _a;
        template = template === null || template === void 0 ? void 0 : template.replace(`{${elem}}`, ((_a = payload === null || payload === void 0 ? void 0 : payload.variables) === null || _a === void 0 ? void 0 : _a[elem]) || "");
    });
    console.log({
        variables,
        template,
        payload,
    }, "NORMAL___CONFIG");
    // Ask openai to generate proposal
    if ((payload === null || payload === void 0 ? void 0 : payload.llm) === enums_1.ModalType.CHAT_GPT) {
        AIResponse = yield (0, generateProposal_1.generateProposalFromOpenAI)({
            context: (targetReference === null || targetReference === void 0 ? void 0 : targetReference.text) || "",
            prompt: template || "",
        });
    }
    else {
        AIResponse = yield (0, generateProposal_1.generateProposalFromGemini)({
            context: (targetReference === null || targetReference === void 0 ? void 0 : targetReference.text) || "",
            prompt: template || "",
        });
    }
    // Create a new document in mongodb in a form submission collection
    const createdRecord = yield formSubmissions_1.FormSubmissions.create({
        payload: {
            project_title: "",
            project_description: "",
        },
        generated_from: payload === null || payload === void 0 ? void 0 : payload.llm,
        response: AIResponse,
    });
    if (!createdRecord) {
        return raiseException("Error Occured while creating the record", http_status_1.default.NOT_IMPLEMENTED);
    }
    return {
        data: {
            aiMessage: AIResponse,
            record: createdRecord,
        },
        message: "Successfully submitted proposal",
    };
}));
