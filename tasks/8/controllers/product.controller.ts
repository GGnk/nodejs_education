import { Request, Response } from "express";

import { SERVER_ERROR_RESPONSE } from "./const";
import { ProductEntity } from "../entities/product.entity";

class ProductController {
  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductEntity.find();
      res.status(200).json({
        data: products,
        error: null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(SERVER_ERROR_RESPONSE);
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      console.log("req.params", req.params);
      const product = await ProductEntity.findById(productId);
      if (!product) {
        res.status(404).json({
          data: null,
          error: {
            message: "No product with such id",
          },
        });
        return;
      }
      res.status(200).json({
        data: product,
        error: null,
      });
    } catch (error) {
      res.status(500).json(SERVER_ERROR_RESPONSE);
    }
  }
}

export default new ProductController();
