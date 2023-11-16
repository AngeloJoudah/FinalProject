"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelAssignment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const assignmentSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    url: String,
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course'
    },
    instructor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignees: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }],
});
exports.modelAssignment = mongoose_1.default.model('Assignments', assignmentSchema);
