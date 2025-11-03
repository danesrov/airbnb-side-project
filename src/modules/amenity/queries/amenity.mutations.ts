export const AMENITY_MUTATION = {
  CREATE: `
    INSERT INTO \`amenidad\` (id_amenidad, nombre)
    VALUES (?, ?)
  `,
  UPDATE_NAME: `
    UPDATE \`amenidad\` SET nombre = ?
    WHERE id_amenidad = ?
  `,
  DELETE: `
    DELETE FROM \`amenidad\` WHERE id_amenidad = ?
  `,
  ASSIGN_BULK: `INSERT INTO \`anuncio_amenidad\` (id_anuncio, id_amenidad) VALUES ?`,
  REMOVE_ONE:  `DELETE FROM \`anuncio_amenidad\` WHERE id_anuncio = ? AND id_amenidad = ?`,
  CLEAR_FOR_LISTING: `DELETE FROM \`anuncio_amenidad\` WHERE id_anuncio = ?`,
} as const;
