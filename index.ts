import * as express from 'express';
import { Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

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
let players: { name: string }[] = [];
let status: Record<string, any> = {};

const logs: string[] = [];

app.get('/api/get-available-games', (req: Request, res: Response<Props>) => {
  const response: Props = {
    success: true,
    error: false,
    data: { data: availableGames }
  };
  res.send(response);
});

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  connectedUsers++;
  console.log(`✅ User connected. Online: ${connectedUsers}`);
  logs.push(`✅ User connected. Online: ${connectedUsers}`);

  io.emit("userCount", connectedUsers);
  io.emit("players", players);
  

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

app.get('/api/logs', (req, res) => {
  res.json({ log: logs });
});

app.post('/api/show-status', (req, res) => {
  const body = req.body;

  // Validate body is object and not empty
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    return res.status(400).send({ error: 'Invalid status object' });
  }

  status = body;

  // Notify all clients about the new status if not empty
  if (Object.keys(status).length > 0) {
    io.emit("lose", status);
  }

  res.send({ message: `Status updated to: ${JSON.stringify(status)}` });
});

app.post('/api/store-name', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  players.push(body);

  // Emit the updated players list
  io.emit("players", players);

  res.send({ message: `${body.name} joined successfully` });
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://0.0.0.0:${PORT}`);
});
