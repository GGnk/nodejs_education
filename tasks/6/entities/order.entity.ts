import { UserEntity } from "./user.entity";
import { CartEntity } from "./cart.entity";
import { Entity, Ref, Property, ManyToOne, Collection } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { CartItemEntity } from "./cartItem.entity";

export type OrderStatus = "created" | "completed";
type OrderPayment = {
  type: string;
  address?: any;
  creditCard?: any;
};
export type OrderDelivery = {
  type: string;
  address: any;
};

@Entity()
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { nullable: true, ref: true })
  user!: Ref<UserEntity>;

  @ManyToOne(() => CartEntity, { nullable: true, ref: true })
  cart!: Ref<CartEntity>;

  @ManyToOne(() => CartItemEntity)
  items = new Collection<CartItemEntity>(this);

  @Property()
  payment!: OrderPayment;

  @Property()
  delivery!: OrderDelivery;

  @Property()
  comments?: string;

  @Property()
  status!: OrderStatus;

  @Property()
  total!: number;

  constructor(
    payment: OrderPayment,
    delivery: OrderDelivery,
    comments: string,
    status: OrderStatus,
    total: number
  ) {
    super();
    this.payment = payment;
    this.delivery = delivery;
    this.comments = comments;
    this.status = status;
    this.total = total;
  }
}
