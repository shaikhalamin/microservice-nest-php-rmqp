import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly rabbitMQClient: ClientProxy,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.rabbitMQClient.connect();
  }

  public send(pattern: string, data: any) {
    try {
      return this.rabbitMQClient.send({ cmd: pattern }, data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public emit(pattern: string, data: any) {
    return this.rabbitMQClient.emit(pattern, data);
  }
}
