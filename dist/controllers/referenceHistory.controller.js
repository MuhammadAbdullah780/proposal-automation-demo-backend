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
exports.deleteReference = exports.listReferences = exports.updateReferenceHistory = exports.createReferenceHistory = exports.fetchSpecificReference = exports.fetchReferenceHistory = void 0;
const http_status_1 = __importDefault(require("http-status"));
const referenceHistory_1 = require("../models/referenceHistory");
const dbRepository_1 = require("../services/dbRepository");
const referenceHistory_2 = require("../services/referenceHistory");
const requestHandler_1 = require("../utils/functions/requestHandler");
const mongoose_1 = require("mongoose");
exports.fetchReferenceHistory = (0, requestHandler_1.requestHandler)((_a) => __awaiter(void 0, [_a], void 0, function* ({ req, raiseException }) {
    var _b;
    //
    const service = new referenceHistory_2.ReferenceHistoryService();
    const referenceType = (_b = req.query) === null || _b === void 0 ? void 0 : _b.reference_type;
    const isInvalidReferenceType = service.checkForInvalidReferenceType(referenceType);
    //
    if (isInvalidReferenceType) {
        return raiseException("Invalid Reference type", http_status_1.default.NOT_ACCEPTABLE);
    }
    const data = yield referenceHistory_1.ReferenceHistory.find(Object.assign({}, (referenceType ? { reference_type: referenceType } : {}))).lean(true);
    return {
        data,
        message: "Successfully fetched the reference history",
    };
}));
exports.fetchSpecificReference = (0, requestHandler_1.requestHandler)((_c) => __awaiter(void 0, [_c], void 0, function* ({ req, raiseException }) {
    const identifier = req.params.referenceId;
    const fetchedReference = yield referenceHistory_1.ReferenceHistory.findById(identifier);
    if (!fetchedReference) {
        raiseException("The refreence you are trying to update is not included in our record", http_status_1.default.NOT_FOUND);
    }
    return {
        data: fetchedReference,
        message: "Fetched the relevant reference",
    };
}));
// export const appendMessagesToReferenceHistory = requestHandler(
//   async ({ req, raiseException }) => {
//     //
//     const service = new ReferenceHistoryService();
//     const body = req.body;
//     const isInvalidReferenceType = service.checkForInvalidReferenceType(
//       body?.referenceType,
//     );
//     // Check for invalid reference type
//     if (isInvalidReferenceType) {
//       return raiseException(
//         "Invalid Reference type",
//         httpStatus.NOT_ACCEPTABLE,
//       );
//     }
//     const fetchedRecord = await ReferenceHistory.findOne({
//       reference_type: body?.referenceType,
//     });
//     if (!fetchedRecord) {
//       return raiseException(
//         "History for particular reference not found",
//         httpStatus.NOT_FOUND,
//       );
//     }
//     // const messages = service.removeDuplicateMessages(
//     //   fetchedRecord?.messages || [],
//     //   body?.messages,
//     // );
//     // const updatedRecord = await ReferenceHistory.findOneAndUpdate(
//     //   { reference_type: body?.referenceType },
//     //   { $set: { messages } },
//     //   { new: true },
//     // );
//     // if (!updatedRecord) {
//     //   return raiseException(
//     //     "Error Occured while updating the record",
//     //     httpStatus.NOT_IMPLEMENTED,
//     //   );
//     // }
//     return {
//       data: {},
//       message: "Successfully added new messages",
//     };
//   },
// );
exports.createReferenceHistory = (0, requestHandler_1.requestHandler)((_d) => __awaiter(void 0, [_d], void 0, function* ({ req, raiseException }) {
    //
    const repo = new dbRepository_1.DbRepository(referenceHistory_1.ReferenceHistory);
    const body = req.body;
    const isExists = yield repo.isDocExits({
        filter: { reference_type: body === null || body === void 0 ? void 0 : body.reference_type },
    });
    if (isExists) {
        return raiseException("This Reference History already exists", http_status_1.default.CONFLICT);
    }
    const createdData = yield referenceHistory_1.ReferenceHistory.create(body);
    return {
        data: createdData,
        isSuccess: true,
        message: "Successfully created new Reference History",
    };
}), { responseStatus: 201 });
exports.updateReferenceHistory = (0, requestHandler_1.requestHandler)((_e) => __awaiter(void 0, [_e], void 0, function* ({ req, raiseException }) {
    var _f;
    // const service = new ReferenceHistoryService();
    const repo = new dbRepository_1.DbRepository(referenceHistory_1.ReferenceHistory);
    const referenceType = (_f = req.params) === null || _f === void 0 ? void 0 : _f.referenceType;
    const { text = "", rich_text = "" } = req.body;
    // Check if record exists
    const isDocExists = yield repo.isDocExits({
        filter: {
            reference_type: referenceType,
        },
    });
    if (!isDocExists) {
        return raiseException("History for particular reference not found", http_status_1.default.NOT_FOUND);
    }
    const updatedDoc = yield referenceHistory_1.ReferenceHistory.findOneAndUpdate({ reference_type: referenceType }, { text, rich_text }, { new: true, runValidators: true });
    if (!updatedDoc) {
        raiseException("Error Occured while updating the reference", http_status_1.default.NOT_MODIFIED);
    }
    return {
        data: updatedDoc,
        message: "Successfully updated the reference",
    };
}));
exports.listReferences = (0, requestHandler_1.requestHandler)(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("HI___");
    const referencesListing = yield referenceHistory_1.ReferenceHistory.aggregate([
        {
            $project: {
                // _id: 0,
                reference_type: 1,
            },
        },
    ]);
    return {
        data: referencesListing,
        message: "Successfully fetched possibble References",
    };
}));
exports.deleteReference = (0, requestHandler_1.requestHandler)((_g) => __awaiter(void 0, [_g], void 0, function* ({ req, raiseException }) {
    var _h;
    const id = new mongoose_1.Types.ObjectId((_h = req.params) === null || _h === void 0 ? void 0 : _h.id);
    const repo = new dbRepository_1.DbRepository(referenceHistory_1.ReferenceHistory);
    console.log(id, "ID_____");
    const isDocExists = repo.isDocExits({ filter: { _id: id } });
    if (!isDocExists) {
        raiseException("The record you are trying to delete is not exists in our record.", http_status_1.default.NOT_FOUND);
    }
    const deletedRecord = yield referenceHistory_1.ReferenceHistory.findByIdAndDelete(id);
    if (!deletedRecord) {
        raiseException("Error occured while deleting the record", http_status_1.default.NOT_IMPLEMENTED);
    }
    return {
        data: deletedRecord,
        message: "Record deleted Successfully",
    };
}));
