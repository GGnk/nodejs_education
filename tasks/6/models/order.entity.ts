import { getUniqueID } from '../utils/utils'
import { CartItemEntity } from './cart.entity'

export type OrderStatus = 'created' | 'completed'

export interface OrderEntity {
    id: string // uuid
    userId: string
    cartId: string
    items: CartItemEntity[] // products from CartEntity
    payment: {
        type: string
        address?: any
        creditCard?: any
    }
    delivery: {
        type: string
        address: any
    }
    comments: string
    status: OrderStatus
    total: number
}

