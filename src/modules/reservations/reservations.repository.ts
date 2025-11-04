import { Inject, Injectable, Logger } from '@nestjs/common';
import { type IDatabaseService } from 'src/core/db/abstracts/db.service';
import { TOKENS } from 'src/core/tokens';
import { IReservationRepository } from './interfaces/reservations.repository';
import { Reservation } from './model/reservation';
import { RESERVATION_QUERIES } from './queries/reservation.queries';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  private readonly logger = new Logger(ReservationRepository.name);

  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.db.query<Reservation>(RESERVATION_QUERIES.QUERIES.FIND_ALL);
  }

  async getById(id: number): Promise<Reservation | null> {
    return this.db.queryOne<Reservation>(
      RESERVATION_QUERIES.QUERIES.GET_BY_ID,
      [id],
    );
  }

  async existsById(id: number): Promise<boolean> {
    const row = await this.db.queryOne<{ exists_: 0 | 1 }>(
      RESERVATION_QUERIES.QUERIES.EXISTS_BY_ID,
      [id],
    );
    return !!row?.exists_;
  }

  async findByStatus(status: number): Promise<Reservation[]> {
    return this.db.query<Reservation>(
      RESERVATION_QUERIES.QUERIES.FIND_BY_STATUS,
      [status],
    );
  }

  async findByGuest(guestId: number): Promise<Reservation[]> {
    return this.db.query<Reservation>(
      RESERVATION_QUERIES.QUERIES.FIND_BY_GUEST,
      [guestId],
    );
  }

  async save(entity: Reservation): Promise<Reservation | null> {
    try {
      await this.db.transac(async (qr) => {
        await qr.query(RESERVATION_QUERIES.MUTATIONS.CREATE_RESERVATION, [
          entity.id_reserva,
          entity.id_huesped,
          entity.id_anuncio,
          entity.estado,
          entity.fecha_entrada,
          entity.fecha_salida,
          entity.noches,
          entity.total,
          entity.zona_horaria_reserva,
        ]);
      });
      return null;
    } catch (error) {
      this.logger.error('Error creating reservation', error);
      return null;
    }
  }

  async update(id: number, entity: Reservation): Promise<boolean> {
    try {
      await this.db.transac(async (qr) => {
        await qr.query(RESERVATION_QUERIES.MUTATIONS.UPDATE_RESERVATION, [
          entity.id_huesped,
          entity.id_anuncio,
          entity.estado,
          entity.fecha_entrada,
          entity.fecha_salida,
          entity.noches,
          entity.total,
          entity.zona_horaria_reserva,
          id,
        ]);
      });
      return true;
    } catch (error) {
      this.logger.error('Error updating reservation', error);
      return false;
    }
  }

  async getLastId(): Promise<number> {
    const last = await this.db.queryOne<{ id_reserva: number }>(
      RESERVATION_QUERIES.QUERIES.LAST_ID,
    );

    return last?.id_reserva || 0;
  }
}
