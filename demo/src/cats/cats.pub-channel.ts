import { Injectable } from '@nestjs/common';
import { AsyncApiChannel, AsyncApiPub } from '@ivamuno/nestjs-openapi';

import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreateCatReplyCommand, CreateCatReplySuccessCommand, CreateCatReplyErrorCommand } from './async/messages';
import { getSchemaPath } from '@nestjs/swagger';

@Injectable()
@AsyncApiChannel({
  name: 'cats-pub-channel:cat-routing-key',
  bindings: {
    'amqp': {
      is: 'routingKey',
      exchange: {
        name: 'cats-pub-channel',
        durable: true,
        autoDelete: false,
        vhost: 'cats'
      }
    }
  }
})
export class CatsPubChannel {
  constructor(private readonly catsService: CatsService) { }

  @AsyncApiPub({
    tags: [{ name: 'CreateCats(RPC)' }],
    summary: 'Create Cat Response',
    description: 'Description for Create Cat Response operation',
    message: {
      name: 'Create Cat Reply Command',
      payload: {
        type: CreateCatReplyCommand,
        discriminator: {
          propertyName: 'messageType',
          mapping: {
            'CreateCatReplySuccessCommand': getSchemaPath(CreateCatReplySuccessCommand),
            'CreateCatReplyErrorCommand': getSchemaPath(CreateCatReplyErrorCommand),
          }
        },
        examples: {
          'CreateCatReplySuccessCommand': {
            value: {
              correlationId: '53312466-e448-432d-8149-29269b5ac522',
              messageId: '309881db-1971-4c63-b905-9ffb7229f979',
              messageType: 'CreateCatReplySuccessCommand',
              timestamp: '2020-12-17T03:29:00',
              version: '1.0.1',
              payload: { identifier: 'pet_001' }
            } as CreateCatReplySuccessCommand
          },
          'CreateCatReplyErrorCommand': {
            value: {
              correlationId: '77baeaec-9416-437f-a88f-6a3686ff3a4a',
              messageId: 'b26f52c0-9a15-41ed-a4df-68e332203737',
              messageType: 'CreateCatReplyErrorCommand',
              timestamp: '2020-12-21T03:31:00',
              version: '1.0.1',
              payload: { errorCode: '500', errorMessage: 'Bad Request' }
            } as CreateCatReplyErrorCommand
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
  async subscribe(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
