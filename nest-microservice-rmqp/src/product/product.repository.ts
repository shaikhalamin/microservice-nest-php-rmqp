import { EntityRepository, Repository } from 'typeorm';

import { Product } from './entities/product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
