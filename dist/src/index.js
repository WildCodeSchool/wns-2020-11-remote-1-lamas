"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = express_1.default();
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
// import socketio from 'socket.io';
const socketio = __importStar(require("socket.io"));
const server = http_1.createServer(app);
const io = socketio(server);
const user_js_1 = require("./user.js");
const PORT = process.env.PORT || 8000;
app.use(cors_1.default());
io.on('connect', (socket) => {
    socket.on('join', () => {
        user_js_1.addUser(socket.id);
        const userCount = user_js_1.getUserCount();
        socket.broadcast.emit('sendUserCount', userCount);
    });
    socket.on('joinTeacher', () => {
        const emojisIncremented = user_js_1.getMoodCounter();
        socket.emit('getIncrement', emojisIncremented);
    });
    socket.on('changeMood', (name, category) => {
        user_js_1.IncrementEmojis(name, socket.id, category);
        const emojisIncremented = user_js_1.getMoodCounter();
        socket.broadcast.emit('getIncrement', emojisIncremented);
    });
    socket.on('disconnect', () => {
        user_js_1.removeUser(socket.id);
        const userCount = user_js_1.getUserCount();
        socket.broadcast.emit('sendUserCount', userCount);
    });
});
// Heroku deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.join(__dirname, './frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.join(__dirname, './frontend/build/index.html'));
    });
}
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
