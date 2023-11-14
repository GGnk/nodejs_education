import express from "express";
import productRouter, { PRODUCT_URL } from "./routes/product.routes";
import cartRouter, { CART_URL } from "./routes/cart.routes";
import { authenticationCheck } from "./middleware/auth.service";

import uesrRouter, { USER_URL } from "./routes/user.routes";
import { bootstrap } from "./server";
import http from "http";
import type { IUserEntity } from "./entities/user.entity";
declare global {
  namespace Express {
    export interface Request {
      user: IUserEntity;
    }
  }
}
bootstrap().then((app) => {
  const server = http.createServer(app);

  const { PORT } = process.env;
  const port = PORT || 3000;

  app.get("/", (req, res) =>
    res.json({
      message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, ${CART_URL} endpoints!`,
    })
  );

  app
    .use("/api", authenticationCheck)
    .use(PRODUCT_URL, productRouter)
    .use(CART_URL, cartRouter)
    .use(USER_URL, uesrRouter);

  app.use((req, res) => res.status(404).json({ message: "No route found" }));

  // server listening
  server.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
  });
});
