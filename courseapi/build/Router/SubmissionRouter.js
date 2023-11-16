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
const SubmissionModel_1 = require("../Model/SubmissionModel");
const express_1 = __importDefault(require("express"));
const SubmissionRouter = express_1.default.Router();
SubmissionRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, instructor, course, assignment, content } = request.body;
    if (!user && !instructor && !course && !assignment && !content) {
        return response.status(400).json('Invalid request body');
    }
    else {
        try {
            const newSubmission = new SubmissionModel_1.modelSubmission({
                user: user,
                instructor: instructor,
                course: course,
                assignment: assignment,
                content: content
            });
            yield newSubmission.save();
            response.status(200);
        }
        catch (err) {
            response.status(500).json({ error: 'Internal Server error' });
        }
    }
}));
SubmissionRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const submission = yield SubmissionModel_1.modelSubmission.findById(id);
        if (!submission) {
            return response.status(404).json('Requested submission could not be found.');
        }
        response.status(200).json(submission);
    }
    catch (err) {
        console.log(err);
        response.status(500).json('Internal Server Error.');
    }
}));
SubmissionRouter.put('/content', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, content } = request.body;
    try {
        const submission = yield SubmissionModel_1.modelSubmission.findByIdAndUpdate(id, { content: content });
        if (!submission) {
            return response.status(404).json('Requested submission could not be found.');
        }
        response.status(200).json(submission);
    }
    catch (err) {
        console.log(err);
        response.status(500).json('Internal Server Error.');
    }
}));
SubmissionRouter.put('/comments', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, comments } = request.body;
    try {
        const submission = yield SubmissionModel_1.modelSubmission.findByIdAndUpdate(id, { $push: { comments: comments } });
        if (!submission) {
            return response.status(404).json('Requested submission could not be found.');
        }
        response.status(200).json(submission);
    }
    catch (err) {
        console.log(err);
        response.status(500).json('Internal Server Error.');
    }
}));
SubmissionRouter.put('/grade', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, grade } = request.body;
    try {
        const submission = yield SubmissionModel_1.modelSubmission.findByIdAndUpdate(id, { grade: grade });
        if (!submission) {
            return response.status(404).json('Requested submission could not be found.');
        }
        response.status(200).json(submission);
    }
    catch (err) {
        console.log(err);
        response.status(500).json('Internal Server Error.');
    }
}));
SubmissionRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const submission = yield SubmissionModel_1.modelSubmission.findByIdAndRemove(id);
        if (!submission) {
            return response.status(404).json('Requested submission could not be found.');
        }
        response.status(200).json('Deletion Successful!');
    }
    catch (err) {
        console.log(err);
        response.status(500).json('Internal Server Error.');
    }
}));
exports.default = SubmissionRouter;
