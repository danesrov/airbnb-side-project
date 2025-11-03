import { Inject, Injectable, Logger } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { type IDatabaseService } from 'src/core/db/abstracts/db.service';
import { ISeasonRepository } from './interfaces/seasons.repository';
import { Season } from './model/season';
import { SEASON_QUERIES } from './queries/season.queries';

@Injectable()
export class SeasonRepository implements ISeasonRepository {
  private readonly logger = new Logger(SeasonRepository.name);

  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  async findAll(): Promise<Season[]> {
    return this.db.query<Season>(SEASON_QUERIES.QUERIES.FIND_ALL);
  }

  async getById(id: number): Promise<Season | null> {
    return this.db.queryOne<Season>(SEASON_QUERIES.QUERIES.GET_BY_ID, [id]);
  }

  async existsById(id: number): Promise<boolean> {
    const row = await this.db.queryOne<{ exists_: 0 | 1 }>(
      SEASON_QUERIES.QUERIES.EXISTS_BY_ID,
      [id],
    );
    return !!row?.exists_;
  }

  async save(entity: Season): Promise<Season | null> {
    try {
      await this.db.transac(async (qr) => {
        await qr.query(SEASON_QUERIES.MUTATIONS.CREATE_SEASON, [
          entity.id_temporada,
          entity.nombre,
          entity.fecha_inicio,
          entity.fecha_fin,
        ]);
      });
      return entity;
    } catch (err) {
      this.logger.error('Error saving season', err);
      return null;
    }
  }

  async update(id: number, entity: Season): Promise<boolean> {
    try {
      const result = await this.db.query(
        SEASON_QUERIES.MUTATIONS.UPDATE_SEASON,
        [entity.nombre, entity.fecha_inicio, entity.fecha_fin, id],
      );
      return !!result;
    } catch (err) {
      this.logger.error('Error updating season', err);
      return false;
    }
  }

  async findByDateRange(start: Date, end: Date): Promise<Season[]> {
    return this.db.query<Season>(SEASON_QUERIES.QUERIES.FIND_BY_DATE_RANGE, [
      end,
      start,
    ]);
  }
}
