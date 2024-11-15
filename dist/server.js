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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
/**
 * Init express
 */
const app = (0, express_1.default)();
/**
 * Set basic express settings
 */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
/**
 * Root API
 */
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function extractValues(text) {
        const pattern = /\{([^}]*)\}/g; // Regular expression to match curly braces and their content
        const matches = text.match(pattern);
        if (matches) {
            return matches.map((match) => match.slice(1, -1));
        }
        else {
            return [];
        }
    }
    console.log(extractValues("Hello My name is {firstName}} {lastName} {firstName}"));
    res.send("Hello World");
}));
/**
 * Routers
 */
app.use("/api/v1", routes_1.default);
/**
 * Error Handler
 */
app.use((err, req, res) => {
    return res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Something looks wrong :( !!!" });
});
/**
 * Exporting express app instance
 */
exports.default = app;
