import * as dotenv from "dotenv";
dotenv.config();
import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const options: Options<PostgreSqlDriver> = {
  entities: ["./dist/entities"], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ["./tasks/6/entities"], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: "./dist/migrations", // path to the folder with migrations
    pathTs: "./tasks/6/migrations", // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  type: "postgresql",
};

export default options;
