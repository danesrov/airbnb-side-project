import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { type IUserRepository } from './interfaces/users.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(TOKENS.USER.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findAllUsers() {
    return this.userRepository.findAll();
  }

  async saveUser() {
    return this.userRepository.save({
      id_usuario: 0,
      nombre: 'TEST2',
      apellido: 'OTRO2',
      correo: 'otro2@otro.com',
      telefono: '231232',
      fecha_actualizacion: new Date(),
      fecha_creacion: new Date(),
    });
  }
}
