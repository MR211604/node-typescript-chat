import { ServerForSockets } from "./models/server";
import dotenv from 'dotenv';
dotenv.config();

const server = new ServerForSockets();

server.execute();