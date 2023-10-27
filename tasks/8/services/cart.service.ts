import { CartEntity, TCartItems } from "../entities/cart.entity";

export async function addProductsToCart(userId: string, cartItems: TCartItems) {
  try {
    const userCart = await CartEntity.findOne({ userId });

    if (!userCart) {
      const newCart = new CartEntity({ userId, items: cartItems });
      newCart.validateSync(cartItems);
      await newCart.save();
      return newCart;
    }
    userCart.validateSync(cartItems);
    cartItems.forEach((cartItem) => {
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.product === cartItem.product
      );

      if (existingItemIndex !== -1) {
        userCart.items[existingItemIndex].count += cartItem.count;
      } else {
        userCart.items.push(cartItem);
      }
    });

    await userCart.save();
    return userCart;
  } catch (error) {
    console.log(error);
  }
}

export async function createNewCart(userId: string) {
  try {
    const newCart = new CartEntity({ userId, items: [] });
    await newCart.save();
    return newCart;
  } catch (error) {
    console.error(error);
  }
}

export async function getCart(userId: string) {
  try {
    const userCart = await CartEntity.findOne({ userId });
    return userCart;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCart(userId: string): Promise<void> {
  try {
    await CartEntity.deleteOne({ userId });
  } catch (error) {
    console.error(error);
  }
}
