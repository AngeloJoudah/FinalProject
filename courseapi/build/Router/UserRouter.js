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
const mongoose_1 = __importDefault(require("mongoose"));
const MongoConfig_1 = require("../Mongo/MongoConfig");
const UserRouter = express_1.default.Router();
UserRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    yield (0, MongoConfig_1.connect)();
    console.log(body);
    if (!body.username && !body.firstName && !body.lastName) {
        response.status(404).json('Invalid Request Body');
    }
    else {
        const newUser = new UserModel_1.modelUser({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            courses: body.courses
        });
        yield newUser.save().then((user) => __awaiter(void 0, void 0, void 0, function* () {
            response.json(user);
        })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(error);
            response.status(400).json({ error: error });
        }));
    }
    yield mongoose_1.default.connection.close();
}));
UserRouter.get('/:username', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.params.username;
    yield (0, MongoConfig_1.connect)();
    const user = UserModel_1.modelUser.findOne({ username: username });
    response.json(user);
    yield mongoose_1.default.connection.close();
}));
UserRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, MongoConfig_1.connect)();
        yield UserModel_1.modelUser.find().then((users) => __awaiter(void 0, void 0, void 0, function* () {
            return response.json(users);
        }));
    }
    catch (_a) {
        response.status(500);
    }
    yield mongoose_1.default.connection.close();
}));
exports.default = UserRouter;
