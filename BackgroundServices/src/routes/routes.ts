import { changePassword } from './../controllers/changePassword';
import { Router } from "express";
import { confirmEmail } from "../controllers/confirmEmail";

export const emailRoute = Router()
emailRoute.get('/:token', confirmEmail)

export const passwordRoute = Router()
passwordRoute.get('/:token', changePassword)