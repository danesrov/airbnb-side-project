export const USER_MUTATION = {
  CREATE_USER:
    'INSERT INTO usuario (id_usuario, nombre, apellido, correo, telefono, password) VALUES (?, ?, ?, ?, ?, ?);',
};
