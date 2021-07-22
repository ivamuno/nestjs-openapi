import { Injectable } from '@nestjs/common';
import { AsyncApiChannel, AsyncApiPub } from '../../../lib';

import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreateCatReplyCommand, CreateCatReplySuccessCommand, CreateCatReplyErrorCommand } from './async/messages';
import { getSchemaPath } from '@nestjs/swagger';

@Injectable()
@AsyncApiChannel({
  name: 'cats-pub-channel2:cat-routing-key',
  bindings: {
    'amqp': {
      is: 'routingKey',
      exchange: {
        name: 'cats-pub-channel2',
        durable: true,
        autoDelete: false,
        vhost: 'cats'
      }
    }
  }
})
export class CatsPubChannel2 {
  constructor(private readonly catsService: CatsService) { }

  @AsyncApiPub({
    tags: [{ name: 'Cats RPC' }],
    summary: 'Create Cat 2 Response',
    description: 'Description for Create Cat 2 Response operation',
    message: {
      name: 'Create Cat 2 Reply Command',
      payload: {
        type: CreateCatReplyCommand,
        discriminator: {
          propertyName: 'messageType',
          mapping: {
            'CreateCatReplySuccessCommand': getSchemaPath(CreateCatReplySuccessCommand),
            'CreateCatReplyErrorCommand': getSchemaPath(CreateCatReplyErrorCommand),
          }
        }
      }
    },
    bindings: {
      amqp: {
        deliveryMode: 2,
        mandatory: true,
        timestamp: true,
        ack: false
      }
    }
  })
  async publish(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
