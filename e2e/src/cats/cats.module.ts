import { Module } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsEventsChannel } from './cats.event-channel';
import { CatsPubChannel } from './cats.pub-channel';
import { CatsPubChannel2 } from './cats.pub-channel2';
import { CatsService } from './cats.service';
import { CatsSubChannel } from './cats.sub-channel';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsPubChannel, CatsPubChannel2, CatsSubChannel, CatsEventsChannel]
})
export class CatsModule { }
