import { Server } from "socket.io";
import { verifyJWT } from "../helpers/jwt";
import { getUsers, userConnected, userDisconnected } from "../controllers/socket.controller";

export class ServerSocket {

  public io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', async (socket) => {
      const verifiedToken = verifyJWT(socket.handshake.query['x-token']?.toString())

      if (!verifiedToken.success) {
        console.log('socket no identificado')
        return socket.disconnect()
      }      
      await userConnected(verifiedToken.uid)

      this.io.emit('lista-usuarios', await getUsers())

      socket.on('disconnect', async () => {        
        await userDisconnected(verifiedToken.uid)
        this.io.emit('lista-usuarios', await getUsers())
      })

      return

    })


  }

}