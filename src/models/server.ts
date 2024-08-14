import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { ServerSocket } from './stockets';
import { dbConnection } from '../database/config';
import cors from 'cors'
export class ServerForSockets {

  public app: express.Application;
  public port: string | undefined;
  public server: http.Server;
  public io: Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Connecting to database
    dbConnection();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(express.json());
    this.app.use(cors());
    // TODO - CORS
    
    //API Endpoints
    this.app.use('/api/auth', require('../router/auth.routes'));
    this.app.use('/api/messages', require('../router/messages.routes'));
  }

  configSockets() {
    new ServerSocket(this.io);
  }

  execute() {
    this.middlewares();
    this.configSockets();
    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}