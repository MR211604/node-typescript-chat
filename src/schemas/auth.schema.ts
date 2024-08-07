import { z } from "zod";

//Para el registro de un usuario necesito el nombre, email y password
export const registerSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long'
  }),
  email: z.string().email({
    message: 'Please enter a valid email'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long'
  }),
});

//Para el login solamente quiero necesitar el email y el password del usuario
export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long'
  }),
})
