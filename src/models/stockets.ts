import { Server } from "socket.io";

export class ServerSocket {

  public io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('cliente conectado')

      socket.on('disconnect', () => {
        console.log('cliente desconectado')
      })

    })


  }

}