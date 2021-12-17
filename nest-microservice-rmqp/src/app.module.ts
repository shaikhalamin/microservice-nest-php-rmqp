import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

const mySQLUrl = process.env.DB_URL;
const driverType = mySQLUrl ? 'mysql' : 'postgres';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: driverType,
      url: mySQLUrl,
      entities: [`${__dirname}/**/entities/*.{ts,js}`],
      synchronize: true,
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
