import http from "http";
import dotenv from 'dotenv';
import connectMongoDB from './Config/mongoDB.js';
import { connectPrismaDB } from './Config/prismaClient.js';
import app from './app.js';
import { initSocket } from './Services/SocketService.js';

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectMongoDB();
connectPrismaDB();
export default app;
