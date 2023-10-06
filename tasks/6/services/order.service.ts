import { addNewOrder } from '../data/order.repository'

export function createOrder(userId: string) {
    return addNewOrder(userId)
}
