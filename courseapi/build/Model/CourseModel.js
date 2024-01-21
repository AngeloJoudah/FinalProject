"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelCourse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    image: String,
    name: String,
    description: String,
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    roster: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    },
    enrolling: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }]
    },
    assignments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Assignments' }],
    code: {
        type: String,
        required: true,
        unique: true
    }
});
exports.modelCourse = mongoose_1.default.model('Course', courseSchema);
