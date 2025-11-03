import { IRepository } from 'src/core/repositories/general';
import { Zone } from '../model/zone';

export interface IZoneRepository extends IRepository<Zone, number> {
  findByCityId(cityId: number): Promise<Zone[]>;
  update(id: number, entity: Zone): Promise<boolean>;
}
