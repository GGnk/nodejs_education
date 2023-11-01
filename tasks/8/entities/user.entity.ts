import { Schema, model } from "mongoose";

export interface IUserEntity {
  id: string;
  name: string;
  email: string;
}

export const userSchema = new Schema<IUserEntity>({
  name: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: false },
});

export const UserEntity = model("User", userSchema);
