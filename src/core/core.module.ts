import { Module } from '@nestjs/common';
import { GamesDbService } from './games-db.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GamesDbService],
  exports: [GamesDbService],
})
export class CoreModule {}
