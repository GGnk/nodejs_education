import { OrderEntity, OrderStatus } from "../entities/order.entity";
import { getUniqueID } from "../utils/utils";

import { getCartByUserId } from "./cart.repository";

const ORDERS_DB: OrderEntity[] = [];

export function addNewOrder(userId: string): OrderEntity {
  const cart = getCartByUserId(userId);
  const payment = {
    type: "creditCard",
  };
  const delivery = {
    type: "courier",
    address: {
      street: "Esenina",
      house: "1",
      apartment: "1",
    },
  };
  const comments = "test";
  const total = cart.items.reduce((acc, item) => {
    return acc + item.product.price * item.count;
  }, 0);
  const order = {
    id: getUniqueID(),
    userId,
    cartId: cart.id,
    items: cart.items,
    payment,
    delivery,
    total,
    comments,
    status: "created" as OrderStatus,
  };
  // @ts-ignore Next tasks
  ORDERS_DB.push(order);
  // @ts-ignore Next tasks
  return order;
}
