export const ZONE_MUTATION = {
  CREATE_ZONE: `
    INSERT INTO ZONA (id_ciudad, nombre)
    VALUES (?, ?);
  `,
  UPDATE_ZONE: `
    UPDATE ZONA
    SET id_ciudad = ?, nombre = ?
    WHERE id_zona = ?;
  `,
};
