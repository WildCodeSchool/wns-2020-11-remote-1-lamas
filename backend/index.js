const express = require("express");
const http = require('http');

const app = express();
const cors = require("cors");
const socketio = require('socket.io');
const router = require('./router');

const server = http.createServer(app);
const io = socketio(server);

const { addUser } = require('./user.js');

const { incrementEmojiCounter } = require('./emoji.js'); 


const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(router);

// const ENDPOINT = 'http://localhost:8000';
// const socket = io(ENDPOINT, {            // !!! PENSER A METTRE PARAMETRE transports: ['websocket'] !!!
//   transports: ['websocket'],
// });

io.on('connect', (socket) => {
    socket.on('join', (_, callback) => {
        const length = addUser(socket.id)
        socket.emit('getLength', length)
        callback();
    })
   
    socket.on('incrementEmoji', ({ idEmoji }, callback) => {

        const increment = incrementEmojiCounter(idEmoji)
        
        socket.emit('getIncrement', increment)

        callback()
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
