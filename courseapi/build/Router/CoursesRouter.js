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
const CourseModel_1 = require("../Model/CourseModel");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const MongoConfig_1 = require("../Mongo/MongoConfig");
const CourseRouter = express_1.default.Router();
CourseRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, MongoConfig_1.connect)();
    yield CourseModel_1.modelCourse.find().then((courses) => __awaiter(void 0, void 0, void 0, function* () {
        return response.json(courses);
    }))
        .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(error);
        response.status(400).json({ error: 'content missing' });
    }));
    yield mongoose_1.default.connection.close();
}));
CourseRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield (0, MongoConfig_1.connect)();
    yield CourseModel_1.modelCourse.findByIdAndDelete(id).catch(error => {
        console.log(error);
        response.status(400).json({ error: 'no such entry exists' });
    });
    yield mongoose_1.default.connection.close();
}));
CourseRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    console.log(body);
    if (body.name === undefined || body.description === undefined || body.author) {
        response.status(404).json({ error: 'content missing' });
    }
    else {
        const newCard = new CourseModel_1.modelCourse({
            name: body.name,
            description: body.description,
            image: body.image,
            author: body.author
        });
        yield (0, MongoConfig_1.connect)();
        yield newCard.save().then((course) => __awaiter(void 0, void 0, void 0, function* () {
            response.json(course);
        })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(error);
            response.status(400).json({ error: 'content missing' });
        }));
        yield mongoose_1.default.connection.close();
    }
}));
CourseRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield (0, MongoConfig_1.connect)();
    yield CourseModel_1.modelCourse.findById(id).then(course => {
        response.json(course);
    }).catch(error => {
        console.log(error);
        response.status(400).json({ error: 'content missing' });
    });
    console.log("id: " + id);
    yield mongoose_1.default.connection.close();
}));
exports.default = CourseRouter;
