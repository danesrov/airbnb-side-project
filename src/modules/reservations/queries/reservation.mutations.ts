export const RESERVATION_MUTATION = {
  CREATE_RESERVATION: `
    INSERT INTO reserva (id_reserva, id_huesped, id_anuncio, estado, fecha_checkin, fecha_checkout, noches, total, timezone_reserva)
    VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?);
  `,

  UPDATE_RESERVATION: `
    UPDATE reserva
    SET id_huesped = ?, id_anuncio = ?, estado = ?, fecha_checkin = ?, fecha_checkout = ?, noches = ?, total = ?, ztimezone_reserva = ?
    WHERE id_reserva = ?;
  `,
};
