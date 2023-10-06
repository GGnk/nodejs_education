import { ProductEntity } from '../models/product.entity'

const PRODUCTS_DB: ProductEntity[] = [
    {
        id: '1',
        title: 'Product 1',
        description: 'Description for Product 1',
        price: 19.99,
    },
    {
        id: '2',
        title: 'Product 2',
        description: 'Description for Product 2',
        price: 29.99,
    },
    {
        id: '3',
        title: 'Product 3',
        description: 'Description for Product 3',
        price: 9.99,
    },
    {
        id: '4',
        title: 'Product 4',
        description: 'Description for Product 4',
        price: 14.99,
    },
    {
        id: '5',
        title: 'Product 5',
        description: 'Description for Product 5',
        price: 24.99,
    },
]

export function getAllProducts(): ProductEntity[] {
    return structuredClone(PRODUCTS_DB)
}

export function getProductById(id: string): ProductEntity | undefined {
    return PRODUCTS_DB.find((product) => product.id === id)
}
