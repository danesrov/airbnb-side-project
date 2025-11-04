import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IDatabaseService } from 'src/core/db/abstracts/db.service';
import { TOKENS } from 'src/core/tokens';
import { IListingsRepository } from './interfaces/listings.repository';
import { Listing } from './model/listing.model';
import { LISTING_QUERIES } from './queries/listing.queries';

@Injectable()
export class ListingsRepository implements IListingsRepository {
  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  // IRepository base
  findAll(): Promise<Listing[]> {
    // Usa LIST_BASE con un pageSize grande o crea otra query si prefieres
    return this.db.query<Listing>(`
      SELECT * FROM \`anuncio\` ORDER BY id_anuncio DESC
    `);
  }

  getById(id: number): Promise<Listing | null> {
    return this.db.queryOne<Listing>(
      `
      SELECT * FROM \`anuncio\` WHERE id_anuncio = ? LIMIT 1
    `,
      [id],
    );
  }

  async save(entity: Listing): Promise<Listing> {
    // Inserta con id manual (entity.id_anuncio debe venir del service)
    await this.db.query(LISTING_QUERIES.MUTATIONS.CREATE, [
      entity.id_anuncio,
      entity.id_anfitrion,
      entity.id_ciudad,
      entity.id_zona ?? null,
      entity.id_politica_cancelacion,
      entity.titulo,
      entity.descripcion ?? null,
      entity.direccion ?? null,
      entity.capacidad,
      entity.precio_noche_base,
      entity.min_noches,
      entity.max_noches,
      entity.hora_checkin ?? null,
      entity.hora_checkout ?? null,
      entity.moneda,
    ]);
    const created = await this.getById(entity.id_anuncio);
    return created!;
  }

  async update(id: number, partial: Partial<Listing>): Promise<Listing | null> {
    const current = await this.getById(id);
    if (!current) return null;

    await this.db.query(LISTING_QUERIES.MUTATIONS.UPDATE_CORE, [
      partial.id_ciudad ?? current.id_ciudad,
      partial.id_zona ?? current.id_zona,
      partial.id_politica_cancelacion ?? current.id_politica_cancelacion,
      partial.titulo ?? current.titulo,
      partial.descripcion ?? current.descripcion,
      partial.direccion ?? current.direccion,
      partial.capacidad ?? current.capacidad,
      partial.precio_noche_base ?? current.precio_noche_base,
      partial.min_noches ?? current.min_noches,
      partial.max_noches ?? current.max_noches,
      partial.hora_checkin ?? current.hora_checkin,
      partial.hora_checkout ?? current.hora_checkout,
      partial.moneda ?? current.moneda,
      id,
    ]);

    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const usage = await this.db.queryOne<{ cnt: number }>(
      LISTING_QUERIES.QUERIES.COUNT_USAGE_AMENITIES,
      [id],
    );
    if ((usage?.cnt ?? 0) > 0) {
      throw new BadRequestException(
        'Cannot delete: listing has amenities assigned',
      );
    }
    const res: any = await this.db.query(LISTING_QUERIES.MUTATIONS.DELETE, [
      id,
    ]);
    return res.affectedRows > 0;
  }

  // Extras
  async existsById(id: number): Promise<boolean> {
    const row = await this.db.queryOne<{ ok: 0 | 1 }>(
      LISTING_QUERIES.QUERIES.EXISTS_ID,
      [id],
    );
    return !!row?.ok;
  }

  listAll(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    return this.db.query(LISTING_QUERIES.QUERIES.LIST_BASE, [pageSize, offset]);
  }

  listByCityCapacity(
    id_ciudad: number,
    capacidadMin: number,
    page: number,
    pageSize: number,
  ) {
    const offset = (page - 1) * pageSize;
    return this.db.query(LISTING_QUERIES.QUERIES.LIST_BY_CITY_AND_CAPACITY, [
      id_ciudad,
      capacidadMin,
      pageSize,
      offset,
    ]);
  }

  async moreReserved(): Promise<Listing | null> {
    return this.db.queryOne<Listing>(LISTING_QUERIES.QUERIES.MORE_RESERVERD);
  }

  async getLastId(): Promise<number> {
    const last = await this.db.queryOne<{ id_anuncio: number }>(
      LISTING_QUERIES.QUERIES.LAST_ID,
    );

    return last?.id_anuncio || 0;
  }
}
