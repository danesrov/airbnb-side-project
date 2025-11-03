// src/listings/interfaces/listings.repository.ts
import { IRepository } from 'src/core/repositories/general';
import { Listing } from '../model/listing.model';

export interface IListingsRepository extends IRepository<Listing, number> {
  listAll(page: number, pageSize: number): Promise<any[]>;
  listByCityCapacity(id_ciudad: number, capacidadMin: number, page: number, pageSize: number): Promise<any[]>;
  existsById(id: number): Promise<boolean>;
    update(id: number, partial: Partial<Listing>): Promise<Listing | null>;
  delete(id: number): Promise<boolean>;
}
