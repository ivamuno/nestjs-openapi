import { Injectable } from '@nestjs/common';
import {
  AsyncApiChannel,
  AsyncApiPub,
  OpenApiOperation,
} from '../../../lib';

import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
@AsyncApiChannel({ name: 'CatsChannel' })
export class CatsChannel {
  constructor(private readonly catsService: CatsService) { }

  @AsyncApiPub({
    operationId: 'Sub CreateCatDto',
    message: {
      type: CreateCatDto,
      name: 'SubCreateCat2',
      examples: { 'SubSimple': { value: { name: 'Sub Tobi' } as Cat } }
    },
    description: 'Sub CreateCatDto Description',
    summary: 'Sub Create cat',
  })
  @OpenApiOperation({
    summary: 'Create cat',
    examples: { 'Simple': { value: { name: 'Tobi' } as Cat } }
  })
  async subscribe(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
