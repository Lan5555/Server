import * as express from 'express';
import { Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';  // ✅ import Server from socket.io


const app = express();
const PORT = 3000;

interface Props {
    success: boolean;
    error: boolean;
    data: any;
}

app.use(express.json());
app.use(express.static('public'));

let availableGames: number = 2;
let connectedUsers = 0;

app.get('/api/get-available-games', (req: Request, res: Response<Props>) => {
    const response: Props = {
        success: true,
        error: false,
        data: { data: availableGames }
    };
    res.send(response);
});

const server = http.createServer(app);
const io = new Server(server); // ✅ use socket.io with http server

const logs:string[] = [];

io.on("connection", (socket) => {
    connectedUsers++;
    console.log(`✅ User connected. Online: ${connectedUsers}`);
    logs.push(`✅ User connected. Online: ${connectedUsers}`);

    io.emit("userCount", connectedUsers);

    socket.on("disconnect", () => {
        connectedUsers--;
        console.log(`❌ User disconnected. Online: ${connectedUsers}`);
        logs.push(`❌ User disconnected. Online: ${connectedUsers}`);
        io.emit("userCount", connectedUsers);
    });
});

app.get('/api/get-number-of-players', (req, res) => {
    res.json({ players: connectedUsers });
});

app.get('/api/logs',(req,res) => {
    res.json({log:logs});
});

app.post('api/show-status',(req,res) => {
    const body = req.body;
    
});

server.listen(PORT, () => { // ✅ use server.listen not app.listen
    console.log('🚀 Server is running at http://0.0.0.0:' + PORT);
});
