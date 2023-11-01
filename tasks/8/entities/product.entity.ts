import { Schema, model } from "mongoose";

export interface IProductEntity {
  _id: string;
  title: string;
  description: string;
  price: number;
}

export const productSchema = new Schema<IProductEntity>({
  title: Schema.Types.String,
  description: Schema.Types.String,
  price: Schema.Types.Number,
});

export const ProductEntity = model("Product", productSchema);
