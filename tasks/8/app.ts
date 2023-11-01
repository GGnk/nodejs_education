import express from "express";
import productRouter, { PRODUCT_URL } from "./routes/product.routes";
import cartRouter, { CART_URL } from "./routes/cart.routes";
import { authenticationCheck } from "./middleware/auth.service";

import { connect } from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
  try {
    await connect(`mongodb://root:root_example@127.0.0.1:27017/admin`);

    app.use(express.json());
    app.get("/", (req, res) =>
      res.json({
        message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, ${CART_URL} endpoints!`,
      })
    );

    app
      .use(authenticationCheck)
      .use(PRODUCT_URL, productRouter)
      .use(CART_URL, cartRouter);

    app.use((req, res) => res.status(404).json({ message: "No route found" }));

    app.listen(port, () => {
      console.log(`Server is started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
