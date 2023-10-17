import { Entity, Property, ManyToOne, OneToOne } from "@mikro-orm/core";
import { ProductEntity } from "./product.entity";
import { BaseEntity } from "./base.entity";
import { CartEntity } from "./cart.entity";

@Entity()
export class CartItemEntity extends BaseEntity {
  @ManyToOne(() => CartEntity)
  cart!: CartEntity;

  @OneToOne(() => ProductEntity)
  product!: ProductEntity;

  @Property()
  count!: number;
}
