import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { AssignAmenitiesDto } from './dto/assign-amenities.dto';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly service: AmenitiesService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  create(@Body() dto: CreateAmenityDto) { return this.service.create(dto); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAmenityDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }

  // --- Asignación a anuncios ---
  @Get('/listing/:id_anuncio')
  listForListing(@Param('id_anuncio', ParseIntPipe) id_anuncio: number) {
    return this.service.listForListing(id_anuncio);
  }

  @Put('/listing/:id_anuncio/replace')
  replaceForListing(
    @Param('id_anuncio', ParseIntPipe) id_anuncio: number,
    @Body() body: AssignAmenitiesDto,
  ) {
    return this.service.replaceForListing(id_anuncio, body.amenidadIds);
  }

  @Delete('/listing/:id_anuncio/:id_amenidad')
  removeOneFromListing(
    @Param('id_anuncio', ParseIntPipe) id_anuncio: number,
    @Param('id_amenidad', ParseIntPipe) id_amenidad: number,
  ) {
    return this.service.removeOne(id_anuncio, id_amenidad);
  }
}
