import { Message } from "../types/common";
import { ReferenceHistoryEnum } from "../types/enums";
import { checkInvalidValuesFromEnum } from "../utils/functions";

export class ReferenceHistoryService {
  removeDuplicateMessages(
    existingRecords: Message,
    newRecords: Message,
  ): Message {
    const map = new Map();

    // Logic For removing duplicated questions
    existingRecords.forEach((item) => {
      map.set(item.question, item.answers);
    });

    newRecords.forEach((item) => {
      if (map.has(item.question)) {
        map.set(item.question, [
          ...new Set([...map.get(item.question), ...item.answers]),
        ]);
      } else {
        map.set(item.question, item.answers);
      }
    });

    return Array.from(map, ([name, value]) => ({
      question: name,
      answers: value,
    }));
  }

  checkForInvalidReferenceType(referenceType: string): boolean {
    return !!(
      referenceType &&
      checkInvalidValuesFromEnum(ReferenceHistoryEnum, referenceType)
    );
  }
}
