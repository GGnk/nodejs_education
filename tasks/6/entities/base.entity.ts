import { PrimaryKey, Property } from "@mikro-orm/core";
import { getUniqueID } from "../utils/utils";

export abstract class BaseEntity {
  @PrimaryKey()
  id = getUniqueID();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
