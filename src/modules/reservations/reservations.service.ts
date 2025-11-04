import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { type IReservationRepository } from './interfaces/reservations.repository';
import { Reservation } from './model/reservation';
import { ListingsService } from '../listings/listings.service';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(TOKENS.RESERVATION.REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
    private readonly listingService: ListingsService,
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
    let last = await this.reservationRepository.getLastId();
    data.id_reserva = last += 1;

    const anuncio = await this.listingService.findById(data.id_anuncio);
    if (!anuncio) throw new BadRequestException('Anuncio no encontrado');

    const precio = Number(anuncio.precio_noche_base);
    if (!Number.isFinite(precio) || precio < 0) {
      throw new BadRequestException('precio_noche_base inválido en el anuncio');
    }

    let noches = Number(data.noches);

    if (!Number.isInteger(noches) || noches <= 0) {
      if (!data.fecha_entrada || !data.fecha_salida) {
        throw new BadRequestException(
          'Se requieren fecha_entrada y fecha_salida',
        );
      }
      noches = this.diffNightsUTC(data.fecha_entrada, data.fecha_salida);
    }

    if (noches <= 0) {
      throw new BadRequestException(
        'La fecha_salida debe ser posterior a la fecha_entrada',
      );
    }

    data.noches = noches;
    const total = precio * noches;
    data.total = this.round2(total);
    if (!data.fecha_reserva)
      data.fecha_reserva = this.toMySQLDateLocal(new Date());

    data.fecha_entrada = this.toMySQLDateLocal(data.fecha_entrada);
    data.fecha_salida = this.toMySQLDateLocal(data.fecha_salida);

    return this.reservationRepository.save(data);
  }

  async updateReservation(id: number, data: Reservation) {
    return this.reservationRepository.update(id, data);
  }

  /** Trunca una fecha a medianoche UTC para evitar problemas de DST */
  private dateOnlyUTC(input: Date | string): Date {
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime()))
      throw new BadRequestException('Fecha inválida');
    return new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
    );
  }

  /** Diferencia en noches (días completos) entre dos fechas (UTC) */
  private diffNightsUTC(start: Date | string, end: Date | string): number {
    const s = this.dateOnlyUTC(start);
    const e = this.dateOnlyUTC(end);
    const ms = e.getTime() - s.getTime();
    return Math.ceil(ms / 86_400_000); // 1000*60*60*24
  }

  /** Redondeo a 2 decimales (si trabajas en COP podrías usar Math.round) */
  private round2(n: number) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  private toMySQLDateLocal(d: Date | string): string {
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date.getTime())) throw new Error('Fecha inválida');
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
