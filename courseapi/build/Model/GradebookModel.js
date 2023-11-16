"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelAssignment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const gradebookSchema = new mongoose_1.default.Schema({
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course'
    },
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    submissions: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Submissions'
        }],
    grades: [Number],
    gpa: Number,
    letterGrade: String
});
exports.modelAssignment = mongoose_1.default.model('Grades', gradebookSchema);
