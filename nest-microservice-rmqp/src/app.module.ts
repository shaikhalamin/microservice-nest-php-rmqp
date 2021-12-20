import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

const mySQLUrl = process.env.DB_URL
  ? process.env.DB_URL
  : 'mysql://root:12345678@localhost:3306/nest_microservice_rmqp';
const driverType = 'mysql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: driverType,
      url: mySQLUrl,
      entities: [`${__dirname}/**/entities/*.{ts,js}`],
      synchronize: true,
    }),
    ProductModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
