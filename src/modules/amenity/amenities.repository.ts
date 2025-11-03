import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { IDatabaseService } from 'src/core/db/abstracts/db.service';
import { IAmenitiesRepository } from './interfaces/amenities.repository';
import { Amenity } from './model/amenity';
import { AMENITY_QUERIES } from './queries/amenity.queries';

@Injectable()
export class AmenitiesRepository implements IAmenitiesRepository {
  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  findAll(): Promise<Amenity[]> {
    return this.db.query<Amenity>(AMENITY_QUERIES.QUERIES.FIND_ALL);
  }

  getById(id: number): Promise<Amenity | null> {
    return this.db.queryOne<Amenity>(AMENITY_QUERIES.QUERIES.FIND_BY_ID, [id]);
  }

  async existsById(id: number): Promise<boolean> {
    const row = await this.db.queryOne<{ ok: 0 | 1 }>(AMENITY_QUERIES.QUERIES.EXISTS_BY_ID, [id]);
    return !!row?.ok;
  }

  async save(entity: Pick<Amenity, 'id_amenidad' | 'nombre'>): Promise<Amenity> {
    // Validar UNIQUE nombre
    const existsName = await this.db.queryOne<{ ok: 0 | 1 }>(AMENITY_QUERIES.QUERIES.EXISTS_BY_NAME, [entity.nombre]);
    if (existsName?.ok) throw new BadRequestException('Ya existe una amenidad con ese nombre');

    await this.db.query(AMENITY_QUERIES.MUTATIONS.CREATE, [entity.id_amenidad, entity.nombre]);
    const created = await this.getById(entity.id_amenidad);
    return created!;
  }

  async update(id: number, partial: Partial<Amenity>): Promise<Amenity | null> {
    const current = await this.getById(id);
    if (!current) throw new NotFoundException('Amenidad no encontrada');

    if (partial.nombre && partial.nombre !== current.nombre) {
      const existsName = await this.db.queryOne<{ ok: 0 | 1 }>(AMENITY_QUERIES.QUERIES.EXISTS_BY_NAME, [partial.nombre]);
      if (existsName?.ok) throw new BadRequestException('Nombre ya está en uso');
    }

    await this.db.query(AMENITY_QUERIES.MUTATIONS.UPDATE_NAME, [partial.nombre ?? current.nombre, id]);
    return this.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    const usage = await this.db.queryOne<{ cnt: number }>(AMENITY_QUERIES.QUERIES.COUNT_USAGE_IN_LISTINGS, [id]);
    if ((usage?.cnt ?? 0) > 0) {
      throw new BadRequestException('No se puede eliminar: está asignada a uno o más anuncios');
    }
    await this.db.query(AMENITY_QUERIES.MUTATIONS.DELETE, [id]);
    return true;
  }

  listForListing(id_anuncio: number) {
    return this.db.query<{ id_amenidad: number; nombre: string }>(AMENITY_QUERIES.QUERIES.LIST_FOR_LISTING, [id_anuncio]);
  }

  async assignBulk(id_anuncio: number, amenidadIds: number[]) {
    if (!amenidadIds.length) return;
    const values = amenidadIds.map((id) => [id_anuncio, id]);
    await this.db.query(AMENITY_QUERIES.MUTATIONS.ASSIGN_BULK, [values]);
  }

 async clearForListing(id_anuncio: number): Promise<void> {
  await this.db.query(AMENITY_QUERIES.MUTATIONS.CLEAR_FOR_LISTING, [id_anuncio]);
}

async removeOne(id_anuncio: number, id_amenidad: number): Promise<void> {
  await this.db.query(AMENITY_QUERIES.MUTATIONS.REMOVE_ONE, [id_anuncio, id_amenidad]);
}

}
