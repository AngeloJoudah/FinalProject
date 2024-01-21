"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelChat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatsSchema = new mongoose_1.default.Schema({
    other: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.modelChat = mongoose_1.default.model('Chats', chatsSchema);
