import express from 'express';
import CartController from '../controllers/cart.controller';
import OrderController from '../controllers/order.controller';

const cartRouter = express.Router();

cartRouter.get('/', CartController.getCart);
cartRouter.post('/', CartController.createCart);
cartRouter.put('/', CartController.updateCart);
cartRouter.delete('/', CartController.deleteCart);

cartRouter.post('/checkout', OrderController.createOrder);

export const CART_URL = '/api/profile/cart';
export default cartRouter;