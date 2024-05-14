"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const server_1 = __importDefault(require("./server"));
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Load The ENV
 */
dotenv_1.default.config();
/**
 * Port at which server will run
 */
const port = Number(process.env.PORT || 8001);
/**
 * Connecting to Database
 */
(0, db_1.default)();
/**
 * Listening The server
 */
server_1.default.listen(port, () => {
    // console.log("MONGODB____URI", process.env.MONGO_URL);
    // console.log("ENV___PORT__", process.env.PORT);
    console.log("Server is Listenening on port" + port);
});
