import { addNewOrder } from "../repositories/order.repository";

export function createOrder(userId: string) {
  return addNewOrder(userId);
}
