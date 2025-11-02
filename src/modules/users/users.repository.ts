import { Inject, Injectable, Logger } from '@nestjs/common';
import { type IDatabaseService } from 'src/core/db/abstracts/db.service';
import { TOKENS } from 'src/core/tokens';
import { IUserRepository } from './interfaces/users.repository';
import { User } from './model/user';
import { USER_QUERIES } from './queries/user.queries';

@Injectable()
export class UserRepository implements IUserRepository {
  private logger = new Logger(UserRepository.name);

  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.db.query<User>(USER_QUERIES.QUERIES.FIND_ALL);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.db.queryOne<User>(USER_QUERIES.QUERIES.GET_BY_ID, [email]);
  }

  async getById(id: number): Promise<User | null> {
    return this.db.queryOne<User>(USER_QUERIES.QUERIES.GET_BY_ID, [id]);
  }

  async existsById(id: number): Promise<boolean> {
    const row = await this.db.queryOne<{ exists_: 0 | 1 }>(
      USER_QUERIES.QUERIES.EXISTS_BY_ID,
      [id],
    );

    return !!row?.exists_;
  }

  async save(entity: User): Promise<User | null> {
    try {
      await this.db.transac<any>(async (qr) => {
        await qr.query(USER_QUERIES.MUTATIONS.CREATE_USER, [
          entity.nombre,
          entity.apellido,
          entity.correo,
          entity.telefono,
        ]);
      });

      return null;
    } catch {
      return null;
    }
  }
}
