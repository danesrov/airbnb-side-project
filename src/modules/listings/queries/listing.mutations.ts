// src/listings/queries/listing.mutations.ts
export const LISTING_MUTATION = {
  CREATE: `
    INSERT INTO \`anuncio\`
      (id_anuncio, id_anfitrion, id_ciudad, id_zona, id_politica_cancelacion,
       titulo, descripcion, direccion, capacidad, precio_noche_base,
       min_noches, max_noches, hora_checkin, hora_checkout, moneda)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  UPDATE_CORE: `
    UPDATE \`anuncio\`
    SET id_ciudad = ?, id_zona = ?, id_politica_cancelacion = ?,
        titulo = ?, descripcion = ?, direccion = ?, capacidad = ?, precio_noche_base = ?,
        min_noches = ?, max_noches = ?, hora_checkin = ?, hora_checkout = ?, moneda = ?
    WHERE id_anuncio = ?
  `,
  DELETE: `
    DELETE FROM \`anuncio\` WHERE id_anuncio = ?
  `,
} as const;
