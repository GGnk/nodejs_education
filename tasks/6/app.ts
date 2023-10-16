import express from 'express'
import productRouter, { PRODUCT_URL } from './routes/product.routes'
import cartRouter, { CART_URL } from './routes/cart.routes'
import { authenticationCheck } from './middleware/auth.service'

const app = express().use(express.json())

app.use(authenticationCheck)
.use(PRODUCT_URL, productRouter)
.use(CART_URL, cartRouter)

app.listen(3000, () => {
    console.log('Server is started')
})