import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import router from './Router';

const app = express();
const server = http.createServer(app);
export const io = socketio(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

server.listen(process.env.PORT, () => {
  console.info(`Server listening on port ${process.env.PORT}`);
});
