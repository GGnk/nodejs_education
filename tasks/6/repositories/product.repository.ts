import { ProductEntity } from "../entities/product.entity";
import { EntityRepository } from "@mikro-orm/core";

export class ProductRepository extends EntityRepository<ProductEntity> {}
