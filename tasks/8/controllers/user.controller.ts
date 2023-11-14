import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { SERVER_ERROR_RESPONSE } from "./const";
import { IUserEntity, UserEntity } from "../entities/user.entity";
import jwt from "jsonwebtoken";

class UserController {
  public async register(req: Request, res: Response) {
    try {
      const { email, password, name, role } = req.body as IUserEntity;

      // Validate user input
      if (!(email && password && name && role)) {
        return res.status(400).send("All input is required");
      }

      // Validate if user already exist in our database
      const oldUser = await UserEntity.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserEntity({
        email,
        password: encryptedPassword,
        name,
        role,
      });
      await newUser.save();
      res.status(201).json({
        data: { message: "User registered successfully" },
        error: null,
      });
    } catch (error) {
      res.status(500).json(SERVER_ERROR_RESPONSE);
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as IUserEntity;

      // Validate user input
      if (!(email && password)) {
        return res.status(400).send("All input is required");
      }

      const user = await UserEntity.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email: email, role: user.role },
          process.env.TOKEN_KEY!,
          { expiresIn: "2h" }
        );
        return res.status(201).json({
          data: { token },
          error: null,
        });
      }

      res.status(400).send("Invalid Credentials");
    } catch (error) {
      res.status(500).json({
        data: null,
        error: {
          message: (error as Error).message,
        },
      });
    }
  }
}

export default new UserController();
