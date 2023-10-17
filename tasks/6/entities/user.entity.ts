import { Entity, Property, OneToMany, Collection } from "@mikro-orm/core";
import { CartEntity } from "./cart.entity";
import { OrderEntity } from "./order.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @Property()
  name?: string;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts = new Collection<CartEntity>(this);

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders = new Collection<OrderEntity>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
