import {
  addNewCart,
  getCartByUserId,
  removeCart,
  updateCart,
} from "../repositories/cart.repository";
import { CartEntity, cartItemSchema } from "../entities/cart.entity";
import { CartItemEntity } from "../entities/cartItem.entity";

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

export function addProductsToCart(userId: string, cartItems: CartItemEntity[]) {
  try {
    const usersCart = getCartByUserId(userId);
    const items: CartItemEntity[] = [...usersCart.items, ...cartItems].reduce(
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
      [] as CartItemEntity[]
    );

    const updatedCart = {
      ...usersCart,
      items,
    };
    // @ts-ignore Next tasks
    updateCart(updatedCart);

    return getCartByUserId(userId);
  } catch (error) {
    console.log(error);
  }
}

export function createNewCart(userId: string): CartEntity | undefined {
  try {
    addNewCart(userId);
    return getCart(userId);
  } catch (error) {
    console.error(error);
  }
}

export function getCart(userId: string): CartEntity | undefined {
  try {
    return getCartByUserId(userId);
  } catch (error) {
    console.error(error);
  }
}

export function deleteCart(userId: string): void {
  try {
    removeCart(userId);
  } catch (error) {
    console.error(error);
  }
}
