import { IRepository } from 'src/core/repositories/general';
import { Host } from '../models/host.model';

export interface IHostsRepository extends IRepository<Host, number> {
  list(page: number, pageSize: number): Promise<Host[]>;
  existsById(id: number): Promise<boolean>;
  userExists(userId: number): Promise<boolean>;
  countListingsForHost(id: number): Promise<number>;
  update(id: number, partial: Partial<Host>): Promise<Host | null>;
  delete(id: number): Promise<boolean>;
}
