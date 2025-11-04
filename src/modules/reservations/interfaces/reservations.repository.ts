import { IRepository } from 'src/core/repositories/general';
import { Reservation } from '../model/reservation';

export interface IReservationRepository
  extends IRepository<Reservation, number> {
  findByStatus(status: number): Promise<Reservation[]>;
  findByGuest(guestId: number): Promise<Reservation[]>;
  update(id: number, entity: Reservation): Promise<boolean>;
  getLastId(): Promise<number>;
}
