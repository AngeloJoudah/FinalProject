"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelSubmission = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const submissionSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    instructor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course'
    },
    assignment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Assignment'
    },
    content: Buffer,
    grade: Number,
    comments: [String]
});
exports.modelSubmission = mongoose_1.default.model('Submissions', submissionSchema);
