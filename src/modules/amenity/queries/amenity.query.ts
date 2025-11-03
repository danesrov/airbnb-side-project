export const AMENITY_QUERY = {
  FIND_ALL: `
    SELECT id_amenidad, nombre, created_at, updated_at
    FROM \`amenidad\`
    ORDER BY id_amenidad DESC
  `,
  FIND_BY_ID: `
    SELECT id_amenidad, nombre, created_at, updated_at
    FROM \`amenidad\`
    WHERE id_amenidad = ?
    LIMIT 1
  `,
  EXISTS_BY_NAME: `SELECT 1 AS ok FROM \`amenidad\` WHERE nombre = ? LIMIT 1`,
  EXISTS_BY_ID:   `SELECT 1 AS ok FROM \`amenidad\` WHERE id_amenidad = ? LIMIT 1`,
  COUNT_USAGE_IN_LISTINGS: `
    SELECT COUNT(*) AS cnt
    FROM \`anuncio_amenidad\`
    WHERE id_amenidad = ?
  `,
  LIST_FOR_LISTING: `
    SELECT a.id_amenidad, a.nombre
    FROM \`anuncio_amenidad\` aa
    JOIN \`amenidad\` a ON a.id_amenidad = aa.id_amenidad
    WHERE aa.id_anuncio = ?
    ORDER BY a.nombre
  `,
} as const;