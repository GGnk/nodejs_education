import { OrderEntity } from "../entities/order.entity";

export async function createOrder(userId: string) {
  return await OrderEntity.create({ userId });
}
