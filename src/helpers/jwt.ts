import * as jwt from 'jsonwebtoken';


declare module 'jsonwebtoken' {
  export interface Payload extends jwt.JwtPayload {
      uid: string
      iat: number
      exp: number
  }
}

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

type VerifyJWTResult = 
  | { success: true; uid: string }
  | { success: false; error: unknown };

const verifyJWT = (token: string | undefined = ''): VerifyJWTResult => {
  try {
    const { uid } = <jwt.Payload>jwt.verify(token, process.env.JWT_KEY as string);
    return { success: true, uid };
  } catch (error) {
    return { success: false, error };
  }
}


export { generateJWT, verifyJWT }