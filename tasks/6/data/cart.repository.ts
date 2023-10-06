import { CartEntity } from '../models/cart.entity'
import { getUniqueID } from '../utils/utils'

let CARTS_DB: CartEntity[] = []

export function getCartByUserId(userId: string): CartEntity {
    const cart = CARTS_DB.find(
        (cart) => cart.userId === userId && !cart.isDeleted
    )
    if (!cart) {
        addNewCart(userId)
        const cart = CARTS_DB.find(
            (cart) => cart.userId === userId && !cart.isDeleted
        )
        console.info('User does not have an active cart, new cart was created')
        return structuredClone(cart!)

    }
    return structuredClone(cart)
}

export function addNewCart(userId: string): void {
    const ifUserHasActiveCart = CARTS_DB.some(
        (cart) => cart.userId === userId && !cart.isDeleted
    )
    if (ifUserHasActiveCart) {
        throw new Error('User already has a cart')
    }
    CARTS_DB.push({
        id: getUniqueID(),
        userId,
        items: [],
        isDeleted: false,
    })
}

export function updateCart(cart: CartEntity): void {
    let cartWasUpdated = false
    CARTS_DB = CARTS_DB.map((cartFromDB) => {
        if (cartFromDB.id === cart.id && !cartFromDB.isDeleted) {
            cartFromDB = structuredClone(cart)
            cartWasUpdated = true
        }
        return cartFromDB
    })
    if (!cartWasUpdated) {
        throw new Error('Provided cart does not exist')
    }
}

export function removeCart(userId: string): void {
    let cartWasDeleted = false
    CARTS_DB =  CARTS_DB.map((cart) => {
        if (cart.userId === userId && !cart.isDeleted) {
            cart.isDeleted = true
            cartWasDeleted = true
        }
        return cart
    })
    if (!cartWasDeleted) {
        throw new Error('Provided cart does not exist')
    }
}
