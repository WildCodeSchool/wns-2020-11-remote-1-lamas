const express = require("express");
const http = require('http');

const app = express();
const cors = require("cors");
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);
const { addUser } = require('./user.js'); 
const { incrementEmojiCounter } = require('./emoji.js'); 

const PORT = process.env.PORT || 8000;

app.use(cors())

app.get("/", (req, res) => res.send("Hello World !"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on('connect', (socket) => {

     // on veut stocker les user avec .on => il faut créer un fichier user.js fonction addUser / getUser

    socket.on('join', (_, callback) => {

        const length = addUser(socket.id)

        socket.emit('getLength', length)

            callback();
    })
   
    // créé fichier emoji.js => incrementEmojiCounter / getEmojis 
    socket.on('incrementEmoji', ({ idEmoji }, callback) => {

        // fonction va chercher le nouveau tableau avec l'incrémentation

        const increment = incrementEmojiCounter(idEmoji)
        
        socket.emit('getIncrement', increment) // on renvoie le tableau avec le nouveau counter incrémenter

        callback()
    });
});