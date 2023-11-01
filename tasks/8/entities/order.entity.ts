import { Schema, model } from "mongoose";
import { ICartEntity, TCartItems, cartItemSchema } from "./cart.entity";
import type { IUserEntity } from "./user.entity";

type ORDER_STATUS = "created" | "completed";

export interface OrderEntity {
  id: string;
  user: IUserEntity;
  cart: ICartEntity;
  items: TCartItems;
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const orderSchema = new Schema<OrderEntity>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  items: [cartItemSchema],
  payment: {
    type: Schema.Types.String,
    address: Schema.Types.Mixed,
    creditCard: Schema.Types.Mixed,
  },
  delivery: {
    type: Schema.Types.String,
    address: Schema.Types.Mixed,
  },
  comments: Schema.Types.String,
  status: { type: Schema.Types.String, enum: ["created", "completed"] },
  total: Schema.Types.Number,
});
export const OrderEntity = model("Order", orderSchema);
