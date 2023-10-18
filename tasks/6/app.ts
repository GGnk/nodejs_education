import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import http from "http";
import express from "express";
import productRouter, { PRODUCT_URL } from "./routes/product.routes";
import cartRouter, { CART_URL } from "./routes/cart.routes";
import { authenticationCheck } from "./middleware/auth.service";
import { EntityManager, MikroORM, RequestContext } from "@mikro-orm/core";
import { CartEntity } from "./entities/cart.entity";
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "./entities/product.entity";
import { UserEntity } from "./entities/user.entity";
import config from "./config/orm.config";
import { CartRepository } from "./repositories/cart.repository";
import { OrderRepository } from "./repositories/order.repository";
import { ProductRepository } from "./repositories/product.repository";
import { UserRepository } from "./repositories/user.repository";

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  cartRepository: CartRepository;
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
  userRepository: UserRepository;
};

const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);

  DI.em = DI.orm.em;
  DI.cartRepository = DI.orm.em.getRepository(CartEntity);
  DI.orderRepository = DI.orm.em.getRepository(OrderEntity);
  DI.productRepository = DI.orm.em.getRepository(ProductEntity);
  DI.userRepository = DI.orm.em.getRepository(UserEntity);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
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

  DI.server = app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
  });
})();
