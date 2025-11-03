export const ZONE_QUERY = {
  FIND_ALL: `
    SELECT id_zona, id_ciudad, nombre, fecha_creacion, fecha_actualizacion
    FROM ZONA;
  `,
  GET_BY_ID: `
    SELECT id_zona, id_ciudad, nombre, fecha_creacion, fecha_actualizacion
    FROM ZONA
    WHERE id_zona = ?
    LIMIT 1;
  `,
  EXISTS_BY_ID: `
    SELECT EXISTS(
      SELECT 1 FROM ZONA WHERE id_zona = ?
    ) AS exists_;
  `,
  FIND_BY_CITY_ID: `
    SELECT id_zona, id_ciudad, nombre
    FROM ZONA
    WHERE id_ciudad = ?;
  `,
};
