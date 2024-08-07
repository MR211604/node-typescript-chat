import { Request, Response } from "express";
import user from "../models/user";
import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import * as bcrypt from 'bcryptjs'
import { generateJWT } from "../helpers/jwt";

//Register controller
async function authRegisterUser(req: Request<{}, {}, z.infer<typeof registerSchema>>, res: Response): Promise<any> {
  try {

    const { name, password, email } = req.body;
    const emailExists = await user.findOne({ email });

    //Validaciones
    if (emailExists) {
      return res.status(400).json({ ok: false, message: 'Email already exists' });
    }

    //Generando la salt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //Guardando el usuario en la base de datos
    const newUser = new user({ name, password: hashedPassword, email });
    await newUser.save();

    //Generando el token
    const token = await generateJWT(newUser._id);

    return res.json({ ok: true, message: 'User registered successfully', newUser, token })

  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Internal Server Error' });
  }
}

//Login controller
async function authLoginUser(req: Request<{}, {}, z.infer<typeof loginSchema>>, res: Response): Promise<any> {
  try {

    const { email, password } = req.body

    const foundUser = await user.findOne({ email: email }, ['email', 'password']);

    //Validando que el usuario exista
    if (!foundUser) {
      return res.status(400).json({ ok: false, message: 'Incorrect email or password' });
    }

    const validPassword = bcrypt.compareSync(password, foundUser?.password as string);

    //Validando que la contraseña sea correcta
    if (!validPassword) {
      return res.status(400).json({ ok: false, message: 'Incorrect email or password' });
    }

    //Generando el token
    const token = await generateJWT(foundUser._id);

    return res.json({ ok: true, message: 'Used logged in successfuly', token })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ ok: false, message: 'Internal Server Error' });
  }
}

//Renew token controller
async function authRenewToken(req: Request, res: Response) {

  //Esto es lo que le llega del middleware
  const { uid } = req.body

  //Obteniendo la informacion del usuario por el uid
  const foundUser = await user.findById({ _id: uid });

  const token = await generateJWT(uid);

  res.json({ ok: true, message: 'Renew', token, user: foundUser })

}



export { authRegisterUser, authLoginUser, authRenewToken }