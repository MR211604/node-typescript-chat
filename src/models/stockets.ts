import { Server } from "socket.io";

export class ServerSocket {

  public io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      socket.on('message-to-server', (data) => {
        console.log(data)
        this.io.emit('message-from-server', data)
      })
    })
  }

}