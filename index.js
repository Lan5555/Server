"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket_io_1 = require("socket.io"); // ✅ import Server from socket.io
var app = express();
var PORT = 3000;
app.use(express.json());
app.use(express.static('public'));
var availableGames = 2;
var connectedUsers = 0;
app.get('/api/get-available-games', function (req, res) {
    var response = {
        success: true,
        error: false,
        data: { data: availableGames }
    };
    res.send(response);
});
var server = http.createServer(app);
var io = new socket_io_1.Server(server); // ✅ use socket.io with http server
var logs = [];
io.on("connection", function (socket) {
    connectedUsers++;
    console.log("\u2705 User connected. Online: ".concat(connectedUsers));
    logs.push("\u2705 User connected. Online: ".concat(connectedUsers));
    io.emit("userCount", connectedUsers);
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
app.post('api/show-status', function (req, res) {
    var body = req.body;
});
server.listen(PORT, function () {
    console.log('🚀 Server is running at http://0.0.0.0:' + PORT);
});
