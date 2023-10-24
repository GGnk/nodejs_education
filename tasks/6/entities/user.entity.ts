import {
  Entity,
  Property,
  OneToMany,
  Collection,
  EntityRepositoryType,
} from "@mikro-orm/core";
import { CartEntity } from "./cart.entity";
import { OrderEntity } from "./order.entity";
import { BaseEntity } from "./base.entity";
import { UserRepository } from "../repositories/user.repository";

@Entity({ customRepository: () => UserRepository })
export class UserEntity extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

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
