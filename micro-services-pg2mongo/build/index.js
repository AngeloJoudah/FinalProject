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
const pg_listen_1 = __importDefault(require("pg-listen"));
const dotenv_1 = require("dotenv");
const user_1 = require("./user");
const mongoose_1 = __importDefault(require("mongoose"));
const { Client } = require('pg');
(0, dotenv_1.configDotenv)({
    path: './.env'
});
const url = process.env.MG_URL || "";
const pgconfig = {
    user: process.env.PGQL_USERNAME,
    host: process.env.PGQL_HOST,
    database: process.env.PGQL_DATABASE,
    password: process.env.PGQL_PASSWORD,
    port: Number(process.env.PGQL_PORT),
    ssl: true
};
const updateMongoDB = (notification) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, last_name } = notification;
    const newUser = new user_1.modelUser({ username: username, firstName: name, lastName: last_name });
    yield mongoconnect();
    yield newUser.save().then(e => {
        e;
    });
    mongoose_1.default.connection.close();
});
const mongoconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set('strictQuery', false);
    const connection = yield mongoose_1.default.connect(url);
    return connection;
});
const pgClient = new Client(pgconfig);
const listener = (0, pg_listen_1.default)(pgconfig);
listener.notifications.on('users', updateMongoDB);
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgClient.connect();
        console.log('Connected to PostgreSQL');
        yield listener.connect();
        console.log('Listening for changes...');
        yield listener.listenTo('users');
    }
    catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
    }
});
app();
