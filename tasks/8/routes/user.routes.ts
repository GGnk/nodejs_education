import express from "express";
import UserController from "../controllers/user.controller";

const uesrRouter = express.Router();

uesrRouter.post("/register", UserController.register);
uesrRouter.post("/login", UserController.login);

export const USER_URL = "/";
export default uesrRouter;
