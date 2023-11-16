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
const UserModel_1 = require("../Model/UserModel");
const express_1 = __importDefault(require("express"));
const ChatsRouter = express_1.default.Router();
ChatsRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.body.username;
    const other = request.body.other;
    if (!user && !other) {
        return response.status(400).json({ error: 'Invalid request body' });
    }
    try {
        yield UserModel_1.modelUser.findOneAndUpdate({ username: user }, { $addToSet: { chats: { other: other } } });
        yield UserModel_1.modelUser.findOneAndUpdate({ username: other }, { $addToSet: { chats: { other: user } } });
        response.status(200).json({ message: 'Chats updated successfully' });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}));
ChatsRouter.get('/username/:username', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = request.params.username;
        if (!username) {
            return response.status(404).json('Requested user could not be found.');
        }
        yield UserModel_1.modelUser.findOne({ username: username })
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            const it = user === null || user === void 0 ? void 0 : user.chats;
            response.status(200).json(it);
        }));
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}));
ChatsRouter.get('/username/:username/other/:other', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = request.params.username;
        const other = request.params.other;
        if (!username && !other) {
            return response.status(400).json({ error: 'Invalid Request Body' });
        }
        yield UserModel_1.modelUser.findOne({ username: username })
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            const chats = user === null || user === void 0 ? void 0 : user.chats;
            const it = chats === null || chats === void 0 ? void 0 : chats.find(chat => chat.other === other);
            it ? response.status(200).json(it) : response.status(404).json({ error: 'Requested chat could not be found.' });
        }));
    }
    catch (err) {
        console.error(err);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}));
ChatsRouter.delete('/username/:username/other/:other', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = request.params.username;
        const other = request.params.other;
        if (!username && !other) {
            return response.status(400).json({ error: 'Invalid Request Body' });
        }
        yield UserModel_1.modelUser.findOne({ username: username })
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            user === null || user === void 0 ? void 0 : user.updateOne({ username: user }, { $pull: { chats: { other: other } } }).then(() => {
                response.status(200);
            }).catch(() => {
                response.status(404).json({ error: 'Requested chat could not be found.' });
            });
        }));
    }
    catch (err) {
        console.error(err);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = ChatsRouter;
