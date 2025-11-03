import { Module } from '@nestjs/common';
import { AmenitiesRepository } from './amenities.repository';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { TOKENS } from 'src/core/tokens';

@Module({
  providers: [
    { provide: TOKENS.AMENITY.REPOSITORY, useClass: AmenitiesRepository },
    AmenitiesService,
  ],
  controllers: [AmenitiesController],
  exports: [AmenitiesService],
})
export class AmenitiesModule {}
