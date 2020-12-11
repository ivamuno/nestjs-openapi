import { Injectable } from '@nestjs/common';
import {
  AsyncApiChannel,
  AsyncApiSub,
  OpenApiOperation,
} from '../../../lib';

import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
@AsyncApiChannel({
  name: 'Cats2Channel',
  bindings: {
    'amqp': {
      is: 'routingKey',
      exchange: {
        name: 'CRM-OpsFlow-Request',
        type: 'topic',
        durable: true,
        autoDelete: false,
        vhost: '/'
      },
      bindingVersion: '0.1.0'
    }
  }
})
export class Cats2Channel {
  constructor(private readonly catsService: CatsService) { }

  @AsyncApiSub({
    message: {
      type: CreateCatDto,
      name: 'SubCreateCat2'
    }
  })
  @OpenApiOperation({
    summary: 'Create cat 2',
    examples: { 'Simple2': { value: { name: 'Tobi2' } as Cat } }
  })
  async subscribe(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
