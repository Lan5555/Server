"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var PORT = 3000;
app.use(express.json());
app.use(express.static('public'));
var availableGames = 2;
var connectedUsers = 0;
var players = [];
var status = {};
var logs = [];
app.get('/api/get-available-games', function (req, res) {
    var response = {
        success: true,
        error: false,
        data: { data: availableGames }
    };
    res.send(response);
});
var server = http.createServer(app);
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    connectedUsers++;
    console.log("\u2705 User connected. Online: ".concat(connectedUsers));
    logs.push("\u2705 User connected. Online: ".concat(connectedUsers));
    io.emit("userCount", connectedUsers);
    io.emit("players", players);
    socket.on("disconnect", function () {
        connectedUsers--;
        console.log("\u274C User disconnected. Online: ".concat(connectedUsers));
        logs.push("\u274C User disconnected. Online: ".concat(connectedUsers));
        io.emit("userCount", connectedUsers);
    });
});
app.get('/api/get-number-of-players', function (req, res) {
    res.json({ players: connectedUsers });
});
app.get('/api/logs', function (req, res) {
    res.json({ log: logs });
});
app.post('/api/show-status', function (req, res) {
    var body = req.body;
    // Validate body is object and not empty
    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
        return res.status(400).send({ error: 'Invalid status object' });
    }
    status = body;
    // Notify all clients about the new status if not empty
    if (Object.keys(status).length > 0) {
        io.emit("lose", status);
    }
    res.send({ message: "Status updated to: ".concat(JSON.stringify(status)) });
});
app.post('/api/store-name', function (req, res) {
    var body = req.body;
    if (!body.name) {
        return res.status(400).send({ error: 'Name is required' });
    }
    players.push(body);
    // Emit the updated players list
    io.emit("players", players);
    res.send({ message: "".concat(body.name, " joined successfully") });
});
server.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server is running at http://0.0.0.0:".concat(PORT));
});
