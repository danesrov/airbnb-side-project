import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { ISeasonRepository } from './interfaces/seasons.repository';
import { Season } from './model/season';

@Injectable()
export class SeasonService {
  constructor(
    @Inject(TOKENS.SEASON.REPOSITORY)
    private readonly seasonRepository: ISeasonRepository,
  ) {}

  async findAllSeasons(): Promise<Season[]> {
    return this.seasonRepository.findAll();
  }

  async getSeasonById(id: number): Promise<Season | null> {
    return this.seasonRepository.getById(id);
  }

  async saveSeason(season: Season): Promise<Season | null> {
    return this.seasonRepository.save(season);
  }

  async updateSeason(id: number, season: Season): Promise<boolean> {
    return this.seasonRepository.update(id, season);
  }

  async findByDateRange(start: Date, end: Date): Promise<Season[]> {
    return this.seasonRepository.findByDateRange(start, end);
  }
}
