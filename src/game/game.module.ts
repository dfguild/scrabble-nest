import { Module } from '@nestjs/common';

import { GameService } from './game.service';
import { TileBagService } from './tile-bag-service';
import { GameApiGateway } from './game-api.gateway';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [GameService, GameApiGateway, TileBagService],
  exports: [GameService],
})
export class GameModule {}
