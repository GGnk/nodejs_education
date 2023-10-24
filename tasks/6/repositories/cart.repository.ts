import { EntityRepository } from "@mikro-orm/postgresql";
import { CartEntity } from "../entities/cart.entity";
import { DI } from "../app";

export class CartRepository extends EntityRepository<CartEntity> {
  public async getCartByUserId(userId: string) {
    return await DI.cartRepository.findOneOrFail({
      user: {
        id: userId,
      },
    });
  }
}
