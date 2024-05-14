"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInvalidValuesFromEnum = void 0;
const checkInvalidValuesFromEnum = (obj, target) => {
    return Object.values(obj).includes(target) ? false : true;
};
exports.checkInvalidValuesFromEnum = checkInvalidValuesFromEnum;
