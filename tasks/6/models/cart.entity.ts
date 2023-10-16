import { ProductEntity } from './product.entity'
import Joi from 'joi'

export interface CartItemEntity {
    product: ProductEntity
    count: number
}

export interface CartEntity {
    id: string // uuid
    userId: string
    isDeleted: boolean
    items: CartItemEntity[]
}


export const cartItemSchema = Joi.object({
    product: Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
    }),
    count: Joi.number().required(),
})