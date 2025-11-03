import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { SeasonService } from './seasons.service';
import { Season } from './model/season';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get()
  async getAll() {
    return { seasons: await this.seasonService.findAllSeasons() };
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.seasonService.getSeasonById(id);
  }

  @Post()
  async save(@Body() season: Season) {
    return await this.seasonService.saveSeason(season);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() season: Season) {
    return await this.seasonService.updateSeason(id, season);
  }

  @Get('range/search')
  async findByDateRange(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const results = await this.seasonService.findByDateRange(
      startDate,
      endDate,
    );
    return { seasons: results };
  }
}
