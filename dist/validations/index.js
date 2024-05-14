"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validators = void 0;
const conversation_1 = require("./conversation");
const formSubmission_1 = require("./formSubmission");
const referenceHistory_1 = require("./referenceHistory");
exports.validators = {
    addConversation: conversation_1.addConversationSchema,
    createReferenceHistory: referenceHistory_1.createReferenceHistorySchema,
    updateReferenceHistory: referenceHistory_1.updateReferenceHistorySchema,
    submitProposalForm: formSubmission_1.submitProposalFormSchema,
};
