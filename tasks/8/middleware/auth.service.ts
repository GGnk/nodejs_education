import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../entities/user.entity";

export const authenticationCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    const userId = req.header("x-user-id");
    if (!userId || !UserEntity.findById(userId)) {
      return res.status(401).json({
        data: null,
        error: {
          message: "Header x-user-id is missing or no user with such id",
        },
      });
    }

    req.params.userId = userId;
    next();
  }
};
