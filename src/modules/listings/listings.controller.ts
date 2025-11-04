import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly service: ListingsService) {}

  // /api/listings?page=1&pageSize=20&id_ciudad=1&capacidadMin=2
  @Get()
  list(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '20',
    @Query('id_ciudad') id_ciudad?: string,
    @Query('capacidadMin') capacidadMin?: string,
  ) {
    const p = Number(page),
      ps = Number(pageSize);
    if (id_ciudad && capacidadMin) {
      return this.service.list(p, ps, Number(id_ciudad), Number(capacidadMin));
    }
    return this.service.list(p, ps);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateListingDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateListingDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Get('/more/reserved')
  moreReserved() {
    return this.service.getMoreReserved();
  }
}
