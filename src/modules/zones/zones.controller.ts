import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ZoneService } from './zones.service';
import { Zone } from './model/zone';

@Controller('zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get()
  async getAllZones() {
    return { zones: await this.zoneService.findAllZones() };
  }

  @Get('city/:cityId')
  async getZonesByCity(@Param('cityId') cityId: number) {
    return { zones: await this.zoneService.findZonesByCity(cityId) };
  }

  @Get(':id')
  async getZoneById(@Param('id') id: number) {
    return this.zoneService.getZoneById(id);
  }

  @Post()
  async saveZone(@Body() zone: Zone) {
    return this.zoneService.saveZone(zone);
  }

  @Put(':id')
  async updateZone(@Param('id') id: number, @Body() zone: Zone) {
    return this.zoneService.updateZone(id, zone);
  }
}
