import { Reference, wrap } from "@mikro-orm/core";
import { DI } from "../app";
import { CartEntity, cartItemSchema } from "../entities/cart.entity";
import { CartItemEntity } from "../entities/cartItem.entity";
import { UserEntity } from "../entities/user.entity";

export async function validateReceivedCartItems(cartItems: CartItemEntity[]) {
  return await Promise.all(
    cartItems.map(async (item) => {
      await cartItemSchema.validateAsync(item);
      return item;
    })
  ).catch(({ message }) => {
    const err = new Error(message);
    err.name = "ValidationError";
    throw err;
  });
}

export async function addProductsToCart(
  userId: string,
  cartItems: CartItemEntity[]
) {
  try {
    const usersCart = await DI.cartRepository.getCartByUserId(userId);

    const items = [...usersCart.items, ...cartItems].reduce<CartItemEntity[]>(
      (acc, item) => {
        const existingItem = acc.find(
          (accItem) => accItem.product.id === item.product.id
        );
        if (existingItem) {
          existingItem.count += item.count;
        } else {
          acc.push(item);
        }
        return acc;
      },
      []
    );

    const updatedCart = {
      ...usersCart,
      items,
    };
    wrap(usersCart).assign(updatedCart);
    await DI.em.flush();

    return usersCart;
  } catch (error) {
    console.log(error);
  }
}

export async function createNewCart(
  userId: string
): Promise<CartEntity | undefined> {
  try {
    const newCart = new CartEntity();
    newCart.user = Reference.createFromPK(UserEntity, userId);

    await DI.em.flush();
    return newCart;
  } catch (error) {
    console.error(error);
  }
}

export async function getCart(userId: string): Promise<CartEntity | undefined> {
  try {
    return await DI.cartRepository.getCartByUserId(userId);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCart(userId: string): Promise<void> {
  try {
    const usersCart = await DI.cartRepository.getCartByUserId(userId);
    DI.em.remove(usersCart);
  } catch (error) {
    console.error(error);
  }
}
