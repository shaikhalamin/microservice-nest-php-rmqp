import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({});
  }

  async add(productDto: ProductDto): Promise<Product> {
    const newProduct = Object.assign(new Product(), productDto);
    return this.productRepository.save(newProduct);
  }
  async update(productId: number, productDto: ProductDto): Promise<ProductDto> {
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const updatedProuct = Object.assign(product, productDto);
    return plainToClass(
      ProductDto,
      await this.productRepository.save(updatedProuct),
    );
  }
}
