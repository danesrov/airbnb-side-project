import { IRepository } from 'src/core/repositories/general';
import { Amenity } from '../model/amenity';

export interface IAmenitiesRepository extends IRepository<Amenity, number> {
  listForListing(id_anuncio: number): Promise<Array<Pick<Amenity, 'id_amenidad' | 'nombre'>>>;
  assignBulk(id_anuncio: number, amenidadIds: number[]): Promise<void>;
  clearForListing(id_anuncio: number): Promise<void>;
  save(entity: { id_amenidad: number; nombre: string }): Promise<Amenity>;
  removeOne(id_anuncio: number, id_amenidad: number): Promise<void>;
    update(id: number, partial: Partial<Amenity>): Promise<Amenity | null>;
  delete(id: number): Promise<boolean>;
}
