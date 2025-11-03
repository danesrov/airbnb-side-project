// src/listings/listings.service.ts
import { Inject, Injectable, BadRequestException, NotFoundException ,ConflictException} from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { IListingsRepository } from './interfaces/listings.repository';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

 // si no lo tienes, avísame y te lo paso

@Injectable()
export class ListingsService {
  constructor(
    @Inject(TOKENS.LISTINGS.REPOSITORY)
    private readonly repo: IListingsRepository,

  ) {}

  list(page = 1, pageSize = 20, id_ciudad?: number, capacidadMin?: number) {
    if (id_ciudad && capacidadMin) {
      return this.repo.listByCityCapacity(id_ciudad, capacidadMin, page, pageSize);
    }
    return this.repo.listAll(page, pageSize);
  }

  async findById(id: number) {
    const row = await this.repo.getById(id);
    if (!row) throw new NotFoundException('Listing not found');
    return row;
  }

 async create(dto: CreateListingDto) {
  if (dto.min_noches > dto.max_noches) {
    throw new BadRequestException('min_noches cannot be greater than max_noches');
  }

  // id manual obligatorio
  if (dto.id_anuncio == null || Number.isNaN(Number(dto.id_anuncio))) {
    throw new BadRequestException('id_anuncio is required and must be a number');
  }

  // duplicado de PK
  if (await this.repo.existsById(dto.id_anuncio)) {
    throw new ConflictException('Listing ID already exists');
  }

  try {
    const entity = await this.repo.save({
      id_anuncio: dto.id_anuncio,
      id_anfitrion: dto.id_anfitrion,
      id_ciudad: dto.id_ciudad,
      id_zona: dto.id_zona ?? null,
      id_politica_cancelacion: dto.id_politica_cancelacion,
      titulo: dto.titulo,
      descripcion: dto.descripcion ?? null,
      direccion: dto.direccion ?? null,
      capacidad: dto.capacidad,
      precio_noche_base: dto.precio_noche_base,
      min_noches: dto.min_noches,
      max_noches: dto.max_noches,
      hora_checkin: dto.hora_checkin ?? null,
      hora_checkout: dto.hora_checkout ?? null,
      moneda: dto.moneda,
      // si tu tabla rellena timestamps por defecto, puedes omitirlos
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
    } as any);

    return entity;
  } catch (e: any) {
    // MySQL → HTTP legible
    if (e?.code === 'ER_NO_REFERENCED_ROW_2') {
      const msg = String(e.sqlMessage || '');
      if (msg.includes('FK_ANUNCIO_POLITICA')) {
        throw new BadRequestException('id_politica_cancelacion no existe');
      }
      if (msg.includes('FK_ANUNCIO_CIUDAD')) {
        throw new BadRequestException('id_ciudad no existe');
      }
      if (msg.includes('FK_ANUNCIO_ZONA')) {
        throw new BadRequestException('id_zona no existe');
      }
      if (msg.includes('FK_ANUNCIO_ANFITRION')) {
        throw new BadRequestException('id_anfitrion no existe');
      }
      throw new BadRequestException('Foreign key inválida en anuncio');
    }
    if (e?.code === 'ER_DUP_ENTRY') {
      throw new ConflictException('Listing ID already exists');
    }
    // otros errores reales siguen siendo 500 (correcto)
    throw e;
  }
}
  async update(id: number, dto: UpdateListingDto) {
    if (dto.min_noches > dto.max_noches) {
      throw new BadRequestException('min_noches cannot be greater than max_noches');
    }
    const updated = await this.repo.update(id, {
      id_ciudad: dto.id_ciudad,
      id_zona: dto.id_zona ?? null,
      id_politica_cancelacion: dto.id_politica_cancelacion,
      titulo: dto.titulo,
      descripcion: dto.descripcion ?? null,
      direccion: dto.direccion ?? null,
      capacidad: dto.capacidad,
      precio_noche_base: dto.precio_noche_base,
      min_noches: dto.min_noches,
      max_noches: dto.max_noches,
      hora_checkin: dto.hora_checkin ?? null,
      hora_checkout: dto.hora_checkout ?? null,
      moneda: dto.moneda,
    });
    if (!updated) throw new NotFoundException('Listing not found');
    return updated;
  }

  async remove(id: number) {
    const ok = await this.repo.delete(id);
    if (!ok) throw new NotFoundException('Listing not found');
    return { ok: true, message: 'Listing deleted' };
  }
}
