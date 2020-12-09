import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsChannel } from './cats.channel';
import { Cats2Channel } from './cats2.channel';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsChannel, Cats2Channel]
})
export class CatsModule {}
