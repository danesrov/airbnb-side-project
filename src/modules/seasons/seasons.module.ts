import { Module } from '@nestjs/common';
import { SeasonController } from './seasons.controller';
import { SeasonService } from './seasons.service';
import { SeasonRepository } from './seasons.repository';
import { TOKENS } from 'src/core/tokens';

@Module({
  providers: [
    {
      provide: TOKENS.SEASON.REPOSITORY,
      useClass: SeasonRepository,
    },
    SeasonService,
  ],
  controllers: [SeasonController],
  exports: [SeasonService],
})
export class SeasonModule {}
