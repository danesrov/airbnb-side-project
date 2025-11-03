
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
    SELECT a.id_anuncio, a.titulo, a.precio_noche_base, a.moneda, a.capacidad,
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
} as const;
