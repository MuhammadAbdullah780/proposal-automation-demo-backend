/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IReferenceHistory } from "../models/referenceHistory";

/* @ts-expect-error */
export type Message = Pick<IReferenceHistory, "messages">["messages"];
