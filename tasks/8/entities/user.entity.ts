import { Schema, model } from "mongoose";

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
}
export interface IUserEntity {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
}

export const userSchema = new Schema<IUserEntity>({
  name: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, unique: true, required: true },
  password: Schema.Types.String,
  role: { type: Schema.Types.String, enum: ["admin", "user"] },
});

export const UserEntity = model("User", userSchema);
