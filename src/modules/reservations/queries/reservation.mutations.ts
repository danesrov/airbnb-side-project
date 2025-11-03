export const RESERVATION_MUTATION = {
  CREATE_RESERVATION: `
    INSERT INTO RESERVA (id_huesped, id_anuncio, estado, fecha_entrada, fecha_salida, noches, total, zona_horaria_reserva)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `,

  UPDATE_RESERVATION: `
    UPDATE RESERVA
    SET id_huesped = ?, id_anuncio = ?, estado = ?, fecha_entrada = ?, fecha_salida = ?, noches = ?, total = ?, zona_horaria_reserva = ?
    WHERE id_reserva = ?;
  `,
};
