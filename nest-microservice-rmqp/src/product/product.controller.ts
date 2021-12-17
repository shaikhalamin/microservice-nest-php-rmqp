import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async index() {
    return await this.productService.findAll();
  }

  @Post('/')
  @UsePipes(new ValidationPipe())
  async create(@Body() productDto: ProductDto) {
    return await this.productService.add(productDto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: number, @Body() productDto: ProductDto) {
    return await this.productService.update(id, productDto);
  }
}
