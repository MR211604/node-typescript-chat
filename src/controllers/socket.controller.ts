import user from "../models/user"

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


export {
  userConnected,
  userDisconnected,
  getUsers
}