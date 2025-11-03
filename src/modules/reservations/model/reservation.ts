export class Reservation {
  id_reserva: number;
  id_huesped: number;
  id_anuncio: number;
  estado: number;
  fecha_reserva: Date;
  fecha_entrada: Date;
  fecha_salida: Date;
  noches: number;
  total: number;
  zona_horaria_reserva?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}
