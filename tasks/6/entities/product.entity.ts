import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

@Entity()
export class ProductEntity extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  constructor(title: string, description: string, price: number) {
    super();
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
