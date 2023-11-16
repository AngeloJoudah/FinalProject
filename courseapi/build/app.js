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
const CoursesRouter_1 = __importDefault(require("./Router/CoursesRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserRouter_1 = __importDefault(require("./Router/UserRouter"));
const ChatsRouter_1 = __importDefault(require("./Router/ChatsRouter"));
const MongoConfig_1 = require("./Mongo/MongoConfig");
const AssignmentRouter_1 = __importDefault(require("./Router/AssignmentRouter"));
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = 8081;
app.use(cors());
app.use(express_1.default.json({ limit: '20mb' }));
app.use(body_parser_1.default.json({ limit: '20mb' }));
app.use('/api/v2/courses', CoursesRouter_1.default);
app.use('/api/v2/users', UserRouter_1.default);
app.use('/api/v2/chats', ChatsRouter_1.default);
app.use('/api/v2/assignments', AssignmentRouter_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server running on port ${PORT}`);
    yield (0, MongoConfig_1.connect)();
}));
