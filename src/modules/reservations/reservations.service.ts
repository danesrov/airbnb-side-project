import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { type IReservationRepository } from './interfaces/reservations.repository';
import { Reservation } from './model/reservation';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(TOKENS.RESERVATION.REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
  ) {}

  async findAllReservations() {
    return this.reservationRepository.findAll();
  }

  async findReservationById(id: number) {
    return this.reservationRepository.getById(id);
  }

  async findByGuest(guestId: number) {
    return this.reservationRepository.findByGuest(guestId);
  }

  async findByStatus(status: number) {
    return this.reservationRepository.findByStatus(status);
  }

  async saveReservation(data: Reservation) {
    return this.reservationRepository.save(data);
  }

  async updateReservation(id: number, data: Reservation) {
    return this.reservationRepository.update(id, data);
  }
}
