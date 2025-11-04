export const LISTING_QUERY = {
  FIND_BY_ID: `
    SELECT a.*, c.nombre AS ciudad, z.nombre AS zona
    FROM \`anuncio\` a
    JOIN \`ciudad\` c ON c.id_ciudad = a.id_ciudad
    LEFT JOIN \`zona\` z ON z.id_zona = a.id_zona
    WHERE a.id_anuncio = ?
    LIMIT 1
  `,
  LIST_BASE: `
    SELECT a.id_anuncio, a.titulo, a.precio_noche_base, a.moneda, a.capacidad, a.descripcion,
           c.nombre AS ciudad, z.nombre AS zona
    FROM \`anuncio\` a
    JOIN \`ciudad\` c ON c.id_ciudad = a.id_ciudad
    LEFT JOIN \`zona\` z ON z.id_zona = a.id_zona
    ORDER BY a.id_anuncio DESC
    LIMIT ? OFFSET ?
  `,
  LIST_BY_CITY_AND_CAPACITY: `
    SELECT a.id_anuncio, a.titulo, a.precio_noche_base, a.moneda, a.capacidad,
           c.nombre AS ciudad, z.nombre AS zona
    FROM \`anuncio\` a
    JOIN \`ciudad\` c ON c.id_ciudad = a.id_ciudad
    LEFT JOIN \`zona\` z ON z.id_zona = a.id_zona
    WHERE a.id_ciudad = ? AND a.capacidad >= ?
    ORDER BY a.id_anuncio DESC
    LIMIT ? OFFSET ?
  `,
  EXISTS_ID: `SELECT 1 AS ok FROM \`anuncio\` WHERE id_anuncio = ? LIMIT 1`,
  COUNT_USAGE_AMENITIES: `
    SELECT COUNT(*) AS cnt FROM \`anuncio_amenidad\` WHERE id_anuncio = ?
  `,
  MORE_RESERVERD: `
    SELECT 
      a.*,
      u.id_usuario AS id_anfitrion,
      CONCAT(u.nombre, ' ', u.apellido) AS anfitrion,
      u.correo AS correo_anfitrion, u.telefono AS tel_anfitrion,
      COUNT(r.id_reserva) AS reservas_12m
    FROM anuncio a
    JOIN usuario u ON u.id_usuario = a.id_anfitrion
    LEFT JOIN reserva r
      ON r.id_anuncio = a.id_anuncio
    AND r.estado = 2
    AND r.fecha_checkin >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY a.id_anuncio, a.titulo, a.capacidad, a.precio_noche_base,
            u.id_usuario, u.nombre, u.apellido, u.correo, u.telefono
    ORDER BY reservas_12m DESC
    LIMIT 1
  `,
  LAST_ID: `
    SELECT 
      a.id_anuncio
    FROM anuncio a
    ORDER BY a.id_anuncio DESC
    LIMIT 1
  `,
} as const;
