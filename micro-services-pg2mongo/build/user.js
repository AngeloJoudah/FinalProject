"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    username: String,
    courses: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Course'
        }]
});
exports.modelUser = mongoose_1.default.model('User', userSchema);
