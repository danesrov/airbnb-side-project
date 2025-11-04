export const USER_QUERY = {
  FIND_ALL: 'SELECT * FROM usuario;',
  GET_BY_ID: 'SELECT * FROM usuario US WHERE US.id_usuario = ? LIMIT 1;',
  EXISTS_BY_ID:
    'SELECT EXISTS(SELECT 1 FROM usuario WHERE id_usuario = ?) AS exists_;',
  EXISTS_WITH_HASH_BY_EMAIL: `
    SELECT EXISTS(SELECT 1 FROM usuario WHERE correo = ?) AS exists_;
  `,
  FIND_LAST_ID: `
    SELECT id_usuario 
    FROM usuario
    ORDER BY id_usuario DESC
    LIMIT 1
  `,
  FIND_WITH_HASH_BY_EMAIL: `
    SELECT *
    FROM usuario
    WHERE correo = ?
    LIMIT 1
  `,
};
