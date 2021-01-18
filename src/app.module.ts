import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { CoreModule } from './core/core.module';
import { AppLoggerMiddleware } from './core/app-logger.middleware';

@Module({
  imports: [GameModule, CoreModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
