import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

@Exclude()
export class ProductDto {
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  product_name: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  product_code: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  product_quantity: number;
}
