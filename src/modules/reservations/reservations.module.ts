import { Module } from '@nestjs/common';
import { ReservationRepository } from './reservations.repository';
import { ReservationService } from './reservations.service';
import { ReservationController } from './reservations.controller';
import { TOKENS } from 'src/core/tokens';
import { ListingsModule } from '../listings/listings.module';

@Module({
  imports: [ListingsModule],
  providers: [
    {
      provide: TOKENS.RESERVATION.REPOSITORY,
      useClass: ReservationRepository,
    },
    ReservationService,
  ],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationsModule {}
