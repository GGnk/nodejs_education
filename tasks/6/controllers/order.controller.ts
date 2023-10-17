import { Request, Response } from "express";
import { createOrder } from "../services/order.service";
import { SERVER_ERROR_RESPONSE, USER_ID_HEADER } from "./const";

class OrderController {
  public createOrder(req: Request, res: Response): void {
    try {
      const userId = req.header(USER_ID_HEADER);
      const result = createOrder(userId!);

      res.status(201).json({
        data: result,
        error: null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(SERVER_ERROR_RESPONSE);
    }
  }
}

export default new OrderController();
