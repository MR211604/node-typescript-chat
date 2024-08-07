import { Request, Response } from "express";
import message from "../models/message";

async function getChat(req: Request, res: Response) {
  try {

    const { uid } = req.body
    const { from } = req.params

    //Obteniendo los ultimos 30 mensajes
    const lastThirtyMessages = await message.find({
      $or: [
        { from: uid, to: from },
        { from: from, to: uid }
      ]
    }).sort({ createdAt: 'desc' }).limit(30);

    return res.status(200).json({ ok: true, message: 'Chat retrieved successfully', messages: lastThirtyMessages });

  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Internal Server Error', content: error });
  }

}

export { getChat }