import * as jwt from 'jsonwebtoken';


const generateJWT = (uid: any) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject('No se pudo generar el token')
      } else {
        resolve(token)
      }
    })
  })
}

export { generateJWT }