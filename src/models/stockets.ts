import { Server } from "socket.io";
import { verifyJWT } from "../helpers/jwt";
import { userConnected, userDisconnected } from "../controllers/socket.controller";

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
      console.log('cliente conectado', verifiedToken.uid)
      await userConnected(verifiedToken.uid)

      socket.on('disconnect', async () => {
        console.log('cliente desconectado')
        await userDisconnected(verifiedToken.uid)
      })

      return

    })


  }

}