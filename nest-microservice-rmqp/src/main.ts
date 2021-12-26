import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix('api');
  const APP_NAME = 'Nest microservice rmqp';
  const APP_VERSION = '0.0.1';

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const rabbitMQDockerUrl = 'amqp://admin:admin@rabbitmq_v3:5672';
  const rabbitMQLocalUrl = 'amqp://guest:guest@localhost:5672';

  const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQLocalUrl],
      queue: 'products_queue',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(8888, () =>
    console.log(`Server started at port 8888 with process id ${process.pid}`),
  );
}
bootstrap();
