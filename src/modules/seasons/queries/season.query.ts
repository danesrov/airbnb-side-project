export const SEASON_QUERY = {
  FIND_ALL: `
    SELECT id_temporada, nombre, fecha_inicio, fecha_fin
    FROM TEMPORADA;
  `,
  GET_BY_ID: `
    SELECT id_temporada, nombre, fecha_inicio, fecha_fin
    FROM TEMPORADA
    WHERE id_temporada = $1
    LIMIT 1;
  `,
  EXISTS_BY_ID: `
    SELECT EXISTS(
      SELECT 1 FROM TEMPORADA WHERE id_temporada = $1
    ) AS exists_;
  `,
  FIND_BY_DATE_RANGE: `
    SELECT id_temporada, nombre, fecha_inicio, fecha_fin
    FROM TEMPORADA
    WHERE fecha_inicio <= ? AND fecha_fin >= ?;
  `,
};
