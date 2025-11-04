export interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  password: string;
}

export type PublicUser = Omit<User, 'password'>;
