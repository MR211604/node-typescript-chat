import { Router } from "express";
import { authLoginUser, authRegisterUser, authRenewToken } from "../controllers/auth.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validateToken } from "../middlewares/tokenValidator";

const router = Router();

//!Agregando las rutas para la autenticacion
router.post('/register', schemaValidator(registerSchema), authRegisterUser)

router.post('/login', schemaValidator(loginSchema), authLoginUser)

router.get('/renew', validateToken, authRenewToken);


module.exports = router;