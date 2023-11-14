import productRouter, { PRODUCT_URL } from "./routes/product.routes";
import cartRouter, { CART_URL } from "./routes/cart.routes";
import { authenticationCheck } from "./middleware/auth.service";

import uesrRouter, { USER_URL } from "./routes/user.routes";
import { bootstrap } from "./server";
import http from "http";
import type { IUserEntity } from "./entities/user.entity";
import { Socket } from "net";
import debug from "debug";
import { morganMiddleware } from "./middleware/logger.service";

declare global {
  namespace Express {
    export interface Request {
      user: IUserEntity;
    }
  }
}
bootstrap()
  .then((app) => {
    const server = http.createServer(app);

    const { PORT } = process.env;
    const port = PORT || 3000;
    const httpDebug = debug("app:http");

    // Health check route
    app.get("/health", (req, res) => {
      res.status(200).json({ message: "OK" });
    });

    app.get("/", (req, res) =>
      res.json({
        message: `Welcome! You can call the following APIs: ${PRODUCT_URL}, ${CART_URL} endpoints!`,
      })
    );

    app
      .use("/api", authenticationCheck)
      .use(morganMiddleware)
      .use(PRODUCT_URL, productRouter)
      .use(CART_URL, cartRouter)
      .use(USER_URL, uesrRouter);

    app.use((req, res) => res.status(404).json({ message: "No route found" }));

    // server listening
    server.listen(port, () => {
      httpDebug(`Server is started at http://localhost:${port}`);
    });

    let connections: Socket[] = [];

    server.on("connection", (connection) => {
      connections.push(connection);

      connection.on("close", () => {
        connections = connections.filter(
          (currentConnection) => currentConnection !== connection
        );
      });
    });

    function shutdown() {
      const shutdownDebug = debug("app:shutdown");
      const shutdownErrorDebug = debug("app:shutdown:error");

      shutdownDebug("Received kill signal, shutting down gracefully");

      server.close(() => {
        shutdownDebug("Closed out remaining connections");
        process.exit(0);
      });

      setTimeout(() => {
        shutdownErrorDebug(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 20000);

      connections.forEach((connection) => connection.end());

      setTimeout(() => {
        connections.forEach((connection) => connection.destroy());
      }, 10000);
    }

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  })
  .catch((error) => {
    console.log("Error starting server: ", error);
  });
