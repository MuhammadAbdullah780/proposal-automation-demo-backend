"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceHistoryService = void 0;
const enums_1 = require("../types/enums");
const functions_1 = require("../utils/functions");
class ReferenceHistoryService {
    // removeDuplicateMessages(
    //   existingRecords: Message,
    //   newRecords: Message,
    // ): Message {
    //   const map = new Map();
    //   // Logic For removing duplicated questions
    //   existingRecords.forEach((item) => {
    //     map.set(item.question, item.answers);
    //   });
    //   newRecords.forEach((item) => {
    //     if (map.has(item.question)) {
    //       map.set(item.question, [
    //         ...new Set([...map.get(item.question), ...item.answers]),
    //       ]);
    //     } else {
    //       map.set(item.question, item.answers);
    //     }
    //   });
    //   return Array.from(map, ([name, value]) => ({
    //     question: name,
    //     answers: value,
    //   }));
    // }
    checkForInvalidReferenceType(referenceType) {
        return !!(referenceType &&
            (0, functions_1.checkInvalidValuesFromEnum)(enums_1.ReferenceHistoryEnum, referenceType));
    }
}
exports.ReferenceHistoryService = ReferenceHistoryService;
