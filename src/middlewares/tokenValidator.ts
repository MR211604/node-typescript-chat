import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"

declare module 'jsonwebtoken' {
  export interface Payload extends jwt.JwtPayload {
      uid: string
      iat: number
      exp: number
  }
}


const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {

    const token = req.header('x-token')
    if (!token) {
      return res.status(401).json({ ok: false, message: 'Token is required' })
    }
    
    //Validando el token con la key que hemos definido en process.env.JWT_KEY
    const { uid } = <jwt.Payload>jwt.verify(token, process.env.JWT_KEY as string)
    req.body.uid = uid
    next();
    return

  } catch (error) {    
    return res.status(500).json({ ok: false, message: 'Internal server error', content: error })
  }

}

export { validateToken }