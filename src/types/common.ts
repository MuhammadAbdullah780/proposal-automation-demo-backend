import { IReferenceHistory } from "../models/referenceHistory";

export type Message = Pick<IReferenceHistory, "messages">["messages"];
