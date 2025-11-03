import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { IAmenitiesRepository } from './interfaces/amenities.repository';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
// Si tienes IdGeneratorService para IDs manuales:
// import { IdGeneratorService } from 'src/core/id-generator.service';

@Injectable()
export class AmenitiesService {
  constructor(
    @Inject(TOKENS.AMENITY.REPOSITORY)
    private readonly repo: IAmenitiesRepository,
    // private readonly ids: IdGeneratorService,
  ) {}

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const row = await this.repo.getById(id);
    if (!row) throw new NotFoundException('Amenidad no encontrada');
    return row;
  }

  async create(dto: CreateAmenityDto) {
    // Generar id manual: usa tu secuenciador si lo tienes
    // const id = await this.ids.next('amenidad');
    // return this.repo.save({ id_amenidad: id, nombre: dto.nombre });

    // O si el id viene por body (no recomendado), valida que exista:
    // if (!dto['id_amenidad']) throw new BadRequestException('id_amenidad requerido sin autoincremento');

    // Para este ejemplo, asumo un generador simple basado en MAX+1 (no ideal en concurrencia):
    // Mejor: IdGeneratorService.
    const list = await this.repo.findAll();
    const id = list.length ? Math.max(...list.map(a => a.id_amenidad)) + 1 : 1;

    return this.repo.save({ id_amenidad: id, nombre: dto.nombre });
  }

  update(id: number, dto: UpdateAmenityDto) {
    return this.repo.update(id, { nombre: dto.nombre });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  listForListing(id_anuncio: number) {
    return this.repo.listForListing(id_anuncio);
  }

  async replaceForListing(id_anuncio: number, amenidadIds: number[]) {
    // Reemplazo total (clear + bulk)
    await this.repo.clearForListing(id_anuncio);
    if (amenidadIds.length) await this.repo.assignBulk(id_anuncio, amenidadIds);
    return this.repo.listForListing(id_anuncio);
  }

  removeOne(id_anuncio: number, id_amenidad: number) {
    return this.repo.removeOne(id_anuncio, id_amenidad);
  }
}
