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
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('products')
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

  @EventPattern('PRODUCT_CREATED')
  sum(@Payload() data: ProductDto, @Ctx() context: RmqContext) {
    console.log(
      `data received in microservice with process id ${process.pid}`,
      data,
    );

    const channel = context.getChannelRef();
    // console.log('Channel pattern', context.getPattern());
    // console.log('Channel get message', context.getMessage());
    // console.log('Channel get message', channel);
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
