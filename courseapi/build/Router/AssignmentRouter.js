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
const express_1 = require("express");
const AssignmentModel_1 = require("../Model/AssignmentModel");
const CourseModel_1 = require("../Model/CourseModel");
const UploadToAzure_1 = __importDefault(require("../function/UploadToAzure"));
const GetFromAzureStorage_1 = __importDefault(require("../function/GetFromAzureStorage"));
const AssignmentsRouter = (0, express_1.Router)();
const multer = require('multer');
const upload = multer({});
AssignmentsRouter.post('/', upload.any(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, courseId, instructorId } = request.body;
    const file = request.files;
    if (!name && !description && !courseId && !instructorId) {
        return response.status(404).json({ error: 'Invalid Request Body - All fields must be satisfied' });
    }
    else {
        try {
            const url = yield (0, UploadToAzure_1.default)(file);
            const newAssignment = new AssignmentModel_1.modelAssignment({
                name: name,
                description: description,
                course: courseId,
                instructor: instructorId,
                url: url
            });
            const course = yield CourseModel_1.modelCourse.findByIdAndUpdate(courseId, { $addToSet: { assignments: newAssignment } }, { new: true });
            if (!course) {
                return response.status(400).json({ error: 'Course id is invalid for this request.' });
            }
            yield newAssignment.save();
            response.status(200).json(newAssignment);
        }
        catch (e) {
            console.log(e);
            response.status(500).json('Internal Server Error');
        }
    }
}));
AssignmentsRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const assignment = yield AssignmentModel_1.modelAssignment.findById(id);
        if (!assignment) {
            return response.status(404).json('Requested assignment could not be found.');
        }
        const data = yield (0, GetFromAzureStorage_1.default)(assignment.url);
        const payload = {
            name: assignment.name,
            description: assignment.description,
            course: assignment.course,
            instructor: assignment.instructor,
            content: data
        };
        response.status(200).json(payload);
    }
    catch (err) {
        console.log(err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}));
AssignmentsRouter.put('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description } = request.body;
    try {
        const assignment = AssignmentModel_1.modelAssignment.findByIdAndUpdate(id, { name: name, description: description }, { new: true });
        if (!assignment) {
            return response.status(404).json('Requested assignmnent could not be found.');
        }
        response.status(200).json({ message: 'Assignment updated successfully!' });
    }
    catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}));
AssignmentsRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const assignment = AssignmentModel_1.modelAssignment.findByIdAndDelete(id);
        if (!assignment) {
            return response.status(404).json('Requested assignmnent could not be found.');
        }
        response.status(200).json({ message: 'Assignment deleted successfully!' });
    }
    catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = AssignmentsRouter;
