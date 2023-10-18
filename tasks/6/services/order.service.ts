import { DI } from "../app";

export async function createOrder(userId: string) {
  return await DI.orderRepository.addNewOrder(userId);
}
