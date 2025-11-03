export const RESERVATION_QUERY = {
  FIND_ALL: `
    SELECT r.*, h.id_huesped, a.titulo AS anuncio_titulo, e.codigo AS estado_codigo
    FROM RESERVA r
    JOIN HUESPED h ON h.id_huesped = r.id_huesped
    JOIN ANUNCIO a ON a.id_anuncio = r.id_anuncio
    JOIN CAT_RESERVA_ESTADO e ON e.id_estado = r.estado;
  `,

  GET_BY_ID: `
    SELECT r.*, h.id_huesped, a.titulo AS anuncio_titulo, e.codigo AS estado_codigo
    FROM RESERVA r
    JOIN HUESPED h ON h.id_huesped = r.id_huesped
    JOIN ANUNCIO a ON a.id_anuncio = r.id_anuncio
    JOIN CAT_RESERVA_ESTADO e ON e.id_estado = r.estado
    WHERE r.id_reserva = $1
    LIMIT 1;
  `,

  EXISTS_BY_ID:
    'SELECT EXISTS(SELECT 1 FROM RESERVA WHERE id_reserva = $1) AS exists_;',

  FIND_BY_STATUS: `
    SELECT * FROM RESERVA WHERE estado = $1;
  `,

  FIND_BY_GUEST: `
    SELECT * FROM RESERVA WHERE id_huesped = $1;
  `,
};
