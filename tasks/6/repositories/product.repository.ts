import { ProductEntity } from "../entities/product.entity";

export function getAllProducts(): ProductEntity[] {
  // @ts-ignore Next tasks
  return structuredClone();
}

export function getProductById(id: string): ProductEntity | undefined {
  // @ts-ignore Next tasks
  return PRODUCTS_DB.find((product) => product.id === id);
}
