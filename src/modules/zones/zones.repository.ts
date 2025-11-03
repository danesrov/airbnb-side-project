import { Inject, Injectable, Logger } from '@nestjs/common';
import { IDatabaseService } from 'src/core/db/abstracts/db.service';
import { TOKENS } from 'src/core/tokens';
import { IZoneRepository } from './interfaces/zones.repository';
import { Zone } from './model/zone';
import { ZONE_QUERIES } from './queries/zone.queries';

@Injectable()
export class ZoneRepository implements IZoneRepository {
  private readonly logger = new Logger(ZoneRepository.name);

  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  async findAll(): Promise<Zone[]> {
    return this.db.query<Zone>(ZONE_QUERIES.QUERIES.FIND_ALL);
  }

  async getById(id: number): Promise<Zone | null> {
    return this.db.queryOne<Zone>(ZONE_QUERIES.QUERIES.GET_BY_ID, [id]);
  }

  async existsById(id: number): Promise<boolean> {
    const row = await this.db.queryOne<{ exists_: 0 | 1 }>(
      ZONE_QUERIES.QUERIES.EXISTS_BY_ID,
      [id],
    );
    return !!row?.exists_;
  }

  async findByCityId(cityId: number): Promise<Zone[]> {
    return this.db.query<Zone>(ZONE_QUERIES.QUERIES.FIND_BY_CITY_ID, [cityId]);
  }

  async save(entity: Zone): Promise<Zone | null> {
    try {
      await this.db.transac(async (qr) => {
        await qr.query(ZONE_QUERIES.MUTATIONS.CREATE_ZONE, [
          entity.id_ciudad,
          entity.nombre,
        ]);
      });
      return entity;
    } catch (error) {
      this.logger.error('Error saving zone', error);
      return null;
    }
  }

  async update(id: number, entity: Zone): Promise<boolean> {
    try {
      const result = await this.db.query(ZONE_QUERIES.MUTATIONS.UPDATE_ZONE, [
        entity.id_ciudad,
        entity.nombre,
        id,
      ]);
      return result ? true : false;
    } catch (error) {
      this.logger.error('Error updating zone', error);
      return false;
    }
  }
}
