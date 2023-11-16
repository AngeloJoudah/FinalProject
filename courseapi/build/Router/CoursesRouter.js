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
const UserModel_1 = require("../Model/UserModel");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const CourseRouter = express_1.default.Router();
function generateRandomCode(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset[randomIndex];
    }
    return code;
}
CourseRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = request.params.id; // Access the ID from the URL parameters
    if (!mongoose_1.default.Types.ObjectId.isValid(request.params.id)) {
        return response.status(404).json({ error: 'Course not found' });
    }
    try {
        const course = yield CourseModel_1.modelCourse
            .findOne({ _id: courseId }).populate('roster assignments').populate({ path: 'enrolling', select: 'username profilePicture' });
        console.log(course);
        if (!course) {
            return response.status(404).json({ error: 'Course not found' });
        }
        response.status(200).json(course);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal server error' });
    }
}));
CourseRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield CourseModel_1.modelCourse.findByIdAndDelete(id).catch(error => {
        console.log(error);
        response.status(400).json({ error: 'no such entry exists' });
    });
}));
CourseRouter.put('/enrolling/remove', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.body.userId;
    const courseId = request.body.courseId;
    if (!userId || !courseId) {
        return response.status(400).json({ error: 'Invalid request body.' });
    }
    try {
        const course = yield CourseModel_1.modelCourse.findById(courseId);
        const enrollee = yield CourseModel_1.modelCourse.findById(userId);
        if (!course && !enrollee) {
            return response.status(404).json({ error: 'Course or Enrollee not found' });
        }
        const updated = yield (course === null || course === void 0 ? void 0 : course.updateOne({ $pull: { enrolling: userId } }, { new: true }));
        updated ?
            response.status(200).json({ message: 'Enrollee removed' }) :
            response.status(404).json({ error: 'User not enrolled in course.' });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal server error' });
    }
}));
CourseRouter.put('/admit', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    const courseId = body.courseId;
    const studentId = body.userId;
    console.log(studentId, courseId);
    if (!courseId && !studentId) {
        return response.status(400).json({ message: 'Request body invalid.' });
    }
    try {
        const newStudent = yield UserModel_1.modelUser.findById(studentId);
        const course = yield CourseModel_1.modelCourse.findById(courseId);
        if (!newStudent && !course) {
            return response.status(404).json({ error: 'Enrollee or course could not be found.' });
        }
        const updatedCourse = yield (course === null || course === void 0 ? void 0 : course.updateOne({ $addToSet: { roster: studentId }, $pull: { enrolling: studentId } }, { new: true }));
        if (!updatedCourse) {
            // If no matching document was found, return a 404 response.
            return response.status(404).json("User not enrolled in course.");
        }
        // Send a 200 response with the updated course
        response.status(200).json(updatedCourse);
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error:', error);
        // Send a 500 response for internal server error
        response.status(500).json({ error: "Internal server error" });
    }
}));
CourseRouter.get('/get/code/:code', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const code = request.params.code;
    if (!code) {
        return response.status(400).json({ error: 'Code is missing' });
    }
    try {
        const course = yield CourseModel_1.modelCourse.findOne({ code: code }).select('author image name description').populate({ path: 'author', select: 'username' });
        if (!course) {
            return response.status(404).json({ error: 'Course could not be found.' });
        }
        response.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}));
CourseRouter.put('/enroll', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const student = yield UserModel_1.modelUser.findById(body.id);
        const code = body.code;
        const updatedCourse = yield CourseModel_1.modelCourse.findOneAndUpdate({ code: code }, { $addToSet: { enrolling: student } }, { new: true });
        if (!updatedCourse) {
            // If no matching document was found, return a 404 response.
            return response.status(404).json("Course not found");
        }
        // Send a 200 response with the updated course
        response.status(200).json(updatedCourse);
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error:', error);
        // Send a 500 response for internal server error
        response.status(500).json("Internal server error");
    }
}));
CourseRouter.put('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const courseId = request.body.id;
        const updatedCourse = yield CourseModel_1.modelCourse.findOneAndUpdate({ _id: courseId }, { description: body.description, name: body.name, image: body.image }, { new: true });
        if (!updatedCourse) {
            // If no matching document was found, return a 404 response.
            return response.status(404).json("Course not found");
        }
        // Send a 200 response with the updated course
        response.status(200).json(updatedCourse);
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error:', error);
        // Send a 500 response for internal server error
        response.status(500).json("Internal server error");
    }
}));
CourseRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        // Validate the request data
        if (!body.name || !body.description || !body.author) {
            return response.status(400).json({ error: 'Required fields are missing' });
        }
        // Check if the user with the provided ID exists
        const user = yield UserModel_1.modelUser.findById(body.author);
        if (!user) {
            return response.status(400).json({ error: 'User not found' });
        }
        const newId = new mongoose_1.default.Types.ObjectId();
        // Create a new course
        const newCourse = new CourseModel_1.modelCourse({
            _id: newId,
            name: body.name,
            description: body.description,
            image: body.image,
            author: body.author,
            code: generateRandomCode(8)
        });
        // Save the course
        console.log(newCourse);
        yield newCourse.save();
        yield user.updateOne({ $push: { courses: newId } });
        // Close the MongoDB connection
        // Return the newly created course
        response.status(200).json(newCourse);
    }
    catch (error) {
        // Log the error for debugging purposes
        console.error('Error:', error);
        // Handle the error and send an informative response
        response.status(500).json('Internal server error');
    }
}));
CourseRouter.put('/code', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = request.body.id;
        const updatedCourse = yield CourseModel_1.modelCourse.findOneAndUpdate({ _id: courseId }, { code: generateRandomCode(8) }, { new: true });
        if (!updatedCourse) {
            // If no matching document was found, return a 404 response.
            return response.status(404).json("Course not found");
        }
        // Send a 200 response with the updated course
        response.status(200).json(updatedCourse);
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error:', error);
        // Send a 500 response for internal server error
        response.status(500).json("Internal server error");
    }
}));
CourseRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield CourseModel_1.modelCourse.find().populate('author roster').then(course => {
        response.json(course);
    }).catch(error => {
        console.log(error);
        response.status(400).json({ error: 'content missing' });
    });
}));
exports.default = CourseRouter;
