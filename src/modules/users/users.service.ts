import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { type IUserRepository } from './interfaces/users.repository';
import { PublicUser, User } from './model/user';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 12;

  constructor(
    @Inject(TOKENS.USER.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findAllUsers() {
    return this.userRepository.findAll();
  }

  async saveUser(dto: RegisterDto) {
    const existing = await this.userRepository.existsByEmail(dto.correo);
    if (existing) throw new ConflictException('El correo ya está registrado');

    const hash = await bcrypt.hash(dto.password, this.saltRounds);

    let lastId = await this.userRepository.getLastId();
    lastId += 1;

    return this.userRepository.save({
      id_usuario: lastId,
      nombre: dto.nombre,
      apellido: dto.apellido,
      correo: dto.correo,
      telefono: dto.telefono || '',
      fecha_actualizacion: new Date(),
      fecha_creacion: new Date(),
      password: hash,
    });
  }

  async login(dto: LoginDto): Promise<PublicUser> {
    const user = await this.userRepository.getByEmail(dto.correo);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const correctPassword = await bcrypt.compare(dto.password, user.password);
    if (!correctPassword)
      throw new UnauthorizedException('Credenciales inválidas');

    return this.toPublic(user);
  }

  private toPublic(u: User): PublicUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = u;
    return rest as PublicUser;
  }
}
