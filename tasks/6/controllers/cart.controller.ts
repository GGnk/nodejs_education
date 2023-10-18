import { cartItemSchema } from "./../entities/cart.entity";
import { Request, Response } from "express";
import {
  addProductsToCart,
  createNewCart,
  getCart,
  validateReceivedCartItems,
} from "../services/cart.service";
import { SERVER_ERROR_RESPONSE, USER_ID_HEADER } from "./const";
import { DI } from "../app";

class CartController {
  public getCart(req: Request, res: Response): void {
    try {
      const userId = req.header(USER_ID_HEADER);
      const userCart = getCart(userId!);
      res.status(200).json({
        data: userCart,
        error: null,
      });
    } catch (error) {
      res.status(500).json(SERVER_ERROR_RESPONSE);
    }
  }

  public createCart(req: Request, res: Response): void {
    try {
      const userId = req.header(USER_ID_HEADER);
      const newCart = createNewCart(userId!);
      res.status(201).json({
        data: newCart,
        error: null,
      });
    } catch (error) {
      res.status(500).json(SERVER_ERROR_RESPONSE);
    }
  }

  public async updateCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.header(USER_ID_HEADER);
      const body = req.body;
      const validatedItems = await validateReceivedCartItems(body.items);
      const updatedCart = addProductsToCart(userId!, validatedItems!);
      res.status(200).json({
        data: updatedCart,
        error: null,
      });
    } catch (error: any) {
      if (error?.name === "ValidationError") {
        res.status(400).json({
          data: null,
          error: error.message,
        });
        return;
      }
      res.status(500).json(SERVER_ERROR_RESPONSE);
      throw error;
    }
  }

  public async deleteCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.header(USER_ID_HEADER);
      const cart = await DI.cartRepository.getCartByUserId(userId!);
      await DI.em.remove(cart).flush();
      res.status(200).send({
        data: {
          success: true,
        },
        error: null,
      });
    } catch (error) {
      res.status(500).json(SERVER_ERROR_RESPONSE);
    }
  }
}

export default new CartController();
