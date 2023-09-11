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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourse = exports.createCourse = exports.getAllCourseCards = void 0;
const CourseModel_1 = require("../Model/CourseModel");
const MongoConfig_1 = require("../Mongo/MongoConfig");
const getAllCourseCards = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, MongoConfig_1.connect)();
    return CourseModel_1.modelCourse.find();
});
exports.getAllCourseCards = getAllCourseCards;
const createCourse = (newCourse) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, MongoConfig_1.connect)();
    return newCourse.save();
});
exports.createCourse = createCourse;
const getCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, MongoConfig_1.connect)();
    console.log("id: " + id);
    return CourseModel_1.modelCourse.findById(id);
});
exports.getCourse = getCourse;
