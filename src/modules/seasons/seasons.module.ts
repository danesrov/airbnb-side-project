import { Module } from '@nestjs/common';
import { SeasonController } from './seasons.controller';
import { SeasonService } from './seasons.service';
import { SeasonRepository } from './seasons.repository';
import { TOKENS } from 'src/core/tokens';

@Module({
  controllers: [SeasonController],
  providers: [
    SeasonService,
    {
      provide: TOKENS.SEASON.REPOSITORY,
      useClass: SeasonRepository,
    },
    SeasonService,
  ],
  exports: [SeasonService],
})
export class SeasonModule {}
