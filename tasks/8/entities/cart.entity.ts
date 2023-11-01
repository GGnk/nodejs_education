import { Schema, model } from "mongoose";
import { IProductEntity } from "./product.entity";
import { IUserEntity } from "./user.entity";

interface ICartItemEntity {
  product: IProductEntity;
  count: number;
}
export type TCartItems = ICartItemEntity[];

const cartItemSchema = new Schema<ICartItemEntity>({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  count: Schema.Types.Number,
});

export interface ICartEntity {
  id: string;
  user: IUserEntity;
  isDeleted: boolean;
  items: TCartItems;
}

const cartSchema = new Schema<ICartEntity>({
  user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  isDeleted: { type: Schema.Types.Boolean, default: false },
  items: [cartItemSchema],
});

const CartEntity = model("Cart", cartSchema);
export { CartEntity, cartItemSchema };
