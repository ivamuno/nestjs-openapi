import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsPubChannel } from './cats.pub-channel';
import { CatsSubChannel } from './cats.sub-channel';
import { CatsEventsChannel } from './cats.event-channel';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsPubChannel, CatsSubChannel, CatsEventsChannel]
})
export class CatsModule { }
