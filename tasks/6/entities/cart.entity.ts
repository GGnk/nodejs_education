import {
  Entity,
  Property,
  ManyToOne,
  Collection,
  OneToMany,
  Ref,
} from "@mikro-orm/core";
import { UserEntity } from "./user.entity";
import Joi from "joi";
import { BaseEntity } from "./base.entity";
import { CartItemEntity } from "./cartItem.entity";

@Entity()
export class CartEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { nullable: true, ref: true })
  user!: Ref<UserEntity>;

  @Property()
  isDeleted: boolean = false;

  @OneToMany(() => CartItemEntity, (item) => item.cart, {
    eager: true,
    orphanRemoval: true,
  })
  items = new Collection<CartItemEntity>(this);

  constructor(isDeleted: boolean) {
    super();
    this.isDeleted = isDeleted;
  }
}

export const cartItemSchema = Joi.object({
  product: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  }),
  count: Joi.number().required(),
});
