import { Entity, EntityRepositoryType, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { ProductRepository } from "../repositories/product.repository";

@Entity({ customRepository: () => ProductRepository })
export class ProductEntity extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  [EntityRepositoryType]?: ProductRepository;
  constructor(title: string, description: string, price: number) {
    super();
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
