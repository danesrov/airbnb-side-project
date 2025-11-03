import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/core/tokens';
import { IZoneRepository } from './interfaces/zones.repository';
import { Zone } from './model/zone';

@Injectable()
export class ZoneService {
  constructor(
    @Inject(TOKENS.ZONE.REPOSITORY)
    private readonly zoneRepository: IZoneRepository,
  ) {}

  async findAllZones(): Promise<Zone[]> {
    return this.zoneRepository.findAll();
  }

  async findZonesByCity(cityId: number): Promise<Zone[]> {
    return this.zoneRepository.findByCityId(cityId);
  }

  async getZoneById(id: number): Promise<Zone | null> {
    return this.zoneRepository.getById(id);
  }

  async createZone(zone: Zone): Promise<Zone | null> {
    return this.zoneRepository.save(zone);
  }

  async updateZone(id: number, zone: Zone): Promise<boolean> {
    return this.zoneRepository.update(id, zone);
  }
}
