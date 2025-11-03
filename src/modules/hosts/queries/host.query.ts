export const HOST_QUERY = {
  FIND_ALL_PAGED: `
    SELECT id_anfitrion, calificacion_promedio, fecha_registro
    FROM \`anfitrion\`
    ORDER BY id_anfitrion DESC
    LIMIT ? OFFSET ?
  `,
  FIND_BY_ID: `
    SELECT id_anfitrion, calificacion_promedio, fecha_registro
    FROM \`anfitrion\`
    WHERE id_anfitrion = ?
    LIMIT 1
  `,
  EXISTS_BY_ID: `
    SELECT 1 AS ok FROM \`anfitrion\` WHERE id_anfitrion = ? LIMIT 1
  `,
  // FK helpers
  USER_EXISTS: `
    SELECT 1 AS ok FROM \`usuario\` WHERE id_usuario = ? LIMIT 1
  `,
  COUNT_LISTINGS_FOR_HOST: `
    SELECT COUNT(*) AS cnt FROM \`anuncio\` WHERE id_anfitrion = ?
  `,
} as const;
