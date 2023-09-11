"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CoursesRouter_1 = __importDefault(require("./Router/CoursesRouter"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserRouter_1 = __importDefault(require("./Router/UserRouter"));
const app = (0, express_1.default)();
const PORT = 80;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use('/api/courses', CoursesRouter_1.default);
app.use('/api/users', UserRouter_1.default);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
