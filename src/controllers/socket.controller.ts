import user from "../models/user"
import message from "../models/message"

async function userConnected(_id: string) {
  const connectedUser = await user.findById(_id)
  if (connectedUser) {
    connectedUser.online = true
    await connectedUser.save()
  } else {
    console.log('usuario con id', _id, 'no encontrado')
  }
  return connectedUser
}

async function userDisconnected(_id: string) {
  const connectedUser = await user.findById(_id)
  if (connectedUser) {
    connectedUser.online = false
    await connectedUser.save()
  } else {
    console.log('usuario con id', _id, 'no encontrado')
  }
}

async function getUsers() {

  const usuarios = await user.find().sort('-online')

  return usuarios

}

interface Message {
  from: string,
  to: string,
  message: string
}

async function saveMessage(payload: Message) {
  try {
    const newMessage = new message(payload)
    await newMessage.save() //eso crea timestamp y guarda el mensaje
    return newMessage
  } catch (error) {
    console.log('Ha ocurrido un error al guardar el mensaje:', error)
    return false
  }
}

export {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage
}