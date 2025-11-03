export const SEASON_MUTATION = {
  CREATE_SEASON: `
    INSERT INTO TEMPORADA (nombre, fecha_inicio, fecha_fin)
    VALUES (?, ?, ?);
  `,
  UPDATE_SEASON: `
    UPDATE TEMPORADA
    SET nombre = ?, fecha_inicio = ?, fecha_fin = ?
    WHERE id_temporada = ?;
  `,
};
