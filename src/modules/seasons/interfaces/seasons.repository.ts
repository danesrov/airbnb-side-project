import { IRepository } from 'src/core/repositories/general';
import { Season } from '../model/season';

export interface ISeasonRepository extends IRepository<Season, number> {
  findByDateRange(start: Date, end: Date): Promise<Season[]>;
  update(id: number, entity: Season): Promise<boolean>;
}
