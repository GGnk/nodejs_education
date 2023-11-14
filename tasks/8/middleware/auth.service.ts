import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserEntity, USER_ROLE } from "../entities/user.entity";

export const authenticationCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    const routesWithoutAuth = ["/login", "/register"];
    if (routesWithoutAuth.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Token is required");
    }

    const [tokenType, token] = authHeader.split(" ");

    if (tokenType !== "Bearer") {
      return res.status(403).send("Invalid Token");
    }

    try {
      const user = jwt.verify(token, process.env.TOKEN_KEY!) as IUserEntity;

      req.user = user;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  }
};
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== USER_ROLE.ADMIN) {
    return res.status(403).json({
      error: {
        message: "Forbidden",
      },
    });
  }
  next();
};
