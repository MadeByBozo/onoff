const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Servera statiska filer från "public"-mappen
app.use(express.static(join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(join(__dirname, 'public', 'on.html'));
});

app.get('/on', function(req, res) {
    res.sendFile(join(__dirname, 'public', 'on.html'));
});

app.get('/off', function(req, res) {
    res.sendFile(join(__dirname, 'public', 'off.html'));
});

// Hantera Socket.IO-anslutningar
io.on('connection', (socket) => {
    console.log(socket.id + " Anslöt"); // Denna rad ska skrivas ut
    socket.on('disconnect', () => {
        console.log(socket.id + ' Lämnade');
    });

    socket.on('changePage', (page) => {
        io.emit('changePage', page);
    })
});

// Starta servern
server.listen(3000, () => {
    console.log('Servern kör på http://localhost:3000');
});
