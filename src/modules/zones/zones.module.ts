import { Module } from '@nestjs/common';
import { ZoneController } from './zones.controller';
import { ZoneService } from './zones.service';
import { ZoneRepository } from './zones.repository';
import { TOKENS } from 'src/core/tokens';

@Module({
  providers: [
    {
      provide: TOKENS.ZONE.REPOSITORY,
      useClass: ZoneRepository,
    },
    ZoneService,
  ],
  controllers: [ZoneController],
  exports: [ZoneService],
})
export class ZoneModule {}
