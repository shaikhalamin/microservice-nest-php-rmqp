import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly rabbitMQService: RabbitmqService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({});
  }

  async add(productDto: ProductDto): Promise<Product> {
    try {
      const newProduct = Object.assign(new Product(), productDto);
      const productCreated = await this.productRepository.save(newProduct);
      console.log('Sending to products_queue .... ', productDto);
      this.rabbitMQService.emit('PRODUCT_CREATED', {
        data: productDto,
      });
      return productCreated;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
