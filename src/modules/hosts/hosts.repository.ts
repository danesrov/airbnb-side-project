import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { IDatabaseService } from 'src/core/db/abstracts/db.service';
import { IHostsRepository } from './interfaces/hosts.repository';
import { Host } from './models/host.model';
import { HOST_QUERIES } from './queries/host.queries';

@Injectable()
export class HostsRepository implements IHostsRepository {
  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  // genérico
  findAll(): Promise<Host[]> {
    return this.db.query<Host>(`SELECT id_anfitrion, calificacion_promedio, fecha_registro FROM \`anfitrion\``);
  }

  getById(id: number): Promise<Host | null> {
    return this.db.queryOne<Host>(HOST_QUERIES.QUERIES.FIND_BY_ID, [id]);
  }

  async save(entity: Host): Promise<Host> {
    await this.db.query(HOST_QUERIES.MUTATIONS.CREATE, [
      entity.id_anfitrion,
      entity.calificacion_promedio ?? null,
      entity.fecha_registro,
    ]);
    const created = await this.getById(entity.id_anfitrion);
    return created!;
  }

  async update(id: number, partial: Partial<Host>): Promise<Host | null> {
    const current = await this.getById(id);
    if (!current) return null;

    await this.db.query(HOST_QUERIES.MUTATIONS.UPDATE_CORE, [
      partial.calificacion_promedio ?? current.calificacion_promedio,
      partial.fecha_registro ?? current.fecha_registro,
      id,
    ]);
    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const res: any = await this.db.query(HOST_QUERIES.MUTATIONS.DELETE, [id]);
    return res.affectedRows > 0;
  }

  // extras
  list(page: number, pageSize: number): Promise<Host[]> {
    const offset = (page - 1) * pageSize;
    return this.db.query<Host>(HOST_QUERIES.QUERIES.FIND_ALL_PAGED, [pageSize, offset]);
  }

  async existsById(id: number): Promise<boolean> {
    const row = await this.db.queryOne<{ ok: 0 | 1 }>(HOST_QUERIES.QUERIES.EXISTS_BY_ID, [id]);
    return !!row?.ok;
  }

  async userExists(userId: number): Promise<boolean> {
    const row = await this.db.queryOne<{ ok: 0 | 1 }>(HOST_QUERIES.QUERIES.USER_EXISTS, [userId]);
    return !!row?.ok;
  }

  async countListingsForHost(id: number): Promise<number> {
    const row = await this.db.queryOne<{ cnt: number }>(HOST_QUERIES.QUERIES.COUNT_LISTINGS_FOR_HOST, [id]);
    return row?.cnt ?? 0;
  }
}
