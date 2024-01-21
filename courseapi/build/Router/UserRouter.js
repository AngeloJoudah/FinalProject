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
const UserRouter = express_1.default.Router();
UserRouter.get('/:id/courses', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const user = yield UserModel_1.modelUser.findById(id).populate({ path: 'courses', populate: [{ path: 'author', select: 'username' }, { path: 'roster', select: 'username' }] }).select('username');
        user ? response.status(200).json(user) : response.status(404).json('User not found');
    }
    catch (_a) {
        response.status(500).json('Internal server error');
    }
}));
UserRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    if (!body.username && !body.firstName && !body.lastName) {
        response.status(404).json('Invalid Request Body');
    }
    else {
        const newUser = new UserModel_1.modelUser({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            courses: body.courses,
            chats: body.chats
        });
        yield newUser.save().then((user) => __awaiter(void 0, void 0, void 0, function* () {
            response.json(user);
        })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(error);
            response.status(400).json({ error: error });
        }));
    }
}));
UserRouter.post('/image', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, profilePicture } = request.body;
    if (!username || !profilePicture) {
        return response.status(400).json({ error: "Invalid request body" });
    }
    try {
        yield UserModel_1.modelUser.findOneAndUpdate({ username: username }, { $set: { profilePicture: profilePicture } });
        response.status(200).json({ message: 'Image updated' });
    }
    catch (error) {
        console.error('Error:', error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
}));
UserRouter.get('/username/:username', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.params.username;
    // Wrap the code in a try-catch block to handle potential errors
    try {
        const user = yield UserModel_1.modelUser.findOne({ username: username }).populate('courses');
        // Check if the user was found
        if (user) {
            // Send a JSON response with the user data
            response.json(user);
        }
        else {
            // If the user wasn't found, send a 404 status code
            response.status(404).json({ message: 'User not found' });
        }
        // Close the mongoose connection
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
}));
UserRouter.get('/search/:username', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.params.username;
    if (!username) {
        response.status(404);
    }
    else {
        try {
            const users = yield UserModel_1.modelUser.find({ username: { $regex: new RegExp(username, "i") } });
            if (users.length < 0) {
                response.status(404).json({ error: "no user found matching this username" });
            }
            else {
                const usernames = users.map(element => {
                    return element.username;
                });
                response.json(usernames);
            }
        }
        catch (error) {
            console.error('Error:', error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}));
UserRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserModel_1.modelUser.find().populate('courses', '').then((users) => __awaiter(void 0, void 0, void 0, function* () {
            return response.json(users);
        }));
    }
    catch (_b) {
        response.status(500);
    }
}));
exports.default = UserRouter;
