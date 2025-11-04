export const RESERVATION_QUERY = {
  FIND_ALL: `
    SELECT r.*, h.id_huesped, a.titulo AS anuncio_titulo, e.codigo AS estado_codigo
    FROM reserva r
    JOIN HUESPED h ON h.id_huesped = r.id_huesped
    JOIN ANUNCIO a ON a.id_anuncio = r.id_anuncio
    JOIN CAT_RESERVA_ESTADO e ON e.id_estado = r.estado;
  `,

  GET_BY_ID: `
    SELECT r.*, h.id_huesped, a.titulo AS anuncio_titulo, e.codigo AS estado_codigo
    FROM reserva r
    JOIN HUESPED h ON h.id_huesped = r.id_huesped
    JOIN ANUNCIO a ON a.id_anuncio = r.id_anuncio
    JOIN CAT_RESERVA_ESTADO e ON e.id_estado = r.estado
    WHERE r.id_reserva = ?
    LIMIT 1;
  `,

  EXISTS_BY_ID:
    'SELECT EXISTS(SELECT 1 FROM reserva WHERE id_reserva = ?) AS exists_;',

  FIND_BY_STATUS: `
    SELECT * FROM reserva WHERE estado = ?;
  `,

  FIND_BY_GUEST: `
    SELECT a.*, x.last_fecha_entrada
    FROM (
      SELECT r.id_anuncio, MAX(r.fecha_checkin) AS last_fecha_entrada
      FROM reserva r
      WHERE r.id_huesped = ?
      GROUP BY r.id_anuncio
    ) AS x
    JOIN anuncio a ON a.id_anuncio = x.id_anuncio
    ORDER BY x.last_fecha_entrada DESC;
  `,
  LAST_ID: `
    SELECT id_reserva
    FROM reserva
    ORDER BY id_reserva DESC
    LIMIT 1;
  `,
};
