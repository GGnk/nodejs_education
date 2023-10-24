import { Reference } from "@mikro-orm/core";
import { DI } from "../app";
import { OrderEntity, OrderStatus } from "../entities/order.entity";

import { EntityRepository } from "@mikro-orm/postgresql";
import { CartEntity } from "../entities/cart.entity";
import { UserEntity } from "../entities/user.entity";

export class OrderRepository extends EntityRepository<OrderEntity> {
  async addNewOrder(userId: string) {
    const user = await DI.userRepository.findOne({ id: userId });

    if (!user) {
      throw new Error(`User ID ${userId} was not found.`);
    }

    const cart = await DI.cartRepository.findOne({ user, isDeleted: false });

    if (!cart) {
      throw new Error(`The cart for user ID ${user.id} was not found.`);
    }

    // TODO: test data
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

    const order = new OrderEntity(
      payment,
      delivery,
      comments,
      OrderStatus.CREATED,
      total
    );
    order.user = Reference.createFromPK(UserEntity, userId);
    order.cart = Reference.createFromPK(CartEntity, cart.id);

    return await DI.em.persistAndFlush(order);
  }
}
