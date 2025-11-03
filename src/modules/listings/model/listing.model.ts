export interface Listing {
  id_anuncio: number;
  id_anfitrion: number;
  id_ciudad: number;
  id_zona: number | null;
  id_politica_cancelacion: number;
  titulo: string;
  descripcion: string | null;
  direccion: string | null;
  capacidad: number;
  precio_noche_base: number;
  min_noches: number;
  max_noches: number;
  hora_checkin: string | null;   // 'HH:MM:SS'
  hora_checkout: string | null;  // 'HH:MM:SS'
  moneda: string;                // 'COP' | 'USD' ...
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}
