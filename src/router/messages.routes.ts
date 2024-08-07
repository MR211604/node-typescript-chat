import { Router } from "express";
import { validateToken } from "../middlewares/tokenValidator";
import { getChat } from "../controllers/messages.controller";

const router = Router();

router.get('/:from', validateToken, getChat);

module.exports = router