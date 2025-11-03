// src/hosts/hosts.service.ts
import { Inject, Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { IHostsRepository } from './interfaces/hosts.repository';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostDto } from './dto/update-host.dto';

@Injectable()
export class HostsService {
  constructor(
    @Inject(TOKENS.HOSTS.REPOSITORY)
    private readonly repo: IHostsRepository,
  ) {}

  list(page = 1, pageSize = 20) {
    return this.repo.list(page, pageSize);
  }

  async findById(id: number) {
    const row = await this.repo.getById(id);
    if (!row) throw new NotFoundException('Host not found');
    return row;
  }

  async create(dto: CreateHostDto) {
    // PK manual y FK a usuario
    if (await this.repo.existsById(dto.id_anfitrion)) {
      throw new ConflictException('Host ID already exists');
    }
    if (!(await this.repo.userExists(dto.id_anfitrion))) {
      throw new BadRequestException('id_anfitrion must reference an existing usuario');
    }

    try {
      return await this.repo.save({
        id_anfitrion: dto.id_anfitrion,
        calificacion_promedio: dto.calificacion_promedio ?? null,
        fecha_registro: dto.fecha_registro,
      });
    } catch (e: any) {
      if (e?.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException('id_anfitrion must reference usuario');
      }
      if (e?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Host ID already exists');
      }
      throw e;
    }
  }

  async update(id: number, dto: UpdateHostDto) {
    const updated = await this.repo.update(id, {
      calificacion_promedio: dto.calificacion_promedio ?? null,
      fecha_registro: dto.fecha_registro,
    });
    if (!updated) throw new NotFoundException('Host not found');
    return updated;
  }

  async remove(id: number) {
    // proteger integridad si tiene anuncios
    const inUse = await this.repo.countListingsForHost(id);
    if (inUse > 0) {
      throw new BadRequestException('Cannot delete: host has listings');
    }
    const ok = await this.repo.delete(id);
    if (!ok) throw new NotFoundException('Host not found');
    return { ok: true, message: 'Host deleted' };
  }
}
