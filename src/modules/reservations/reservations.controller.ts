import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { Reservation } from './model/reservation';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getAll() {
    return {
      reservations: await this.reservationService.findAllReservations(),
    };
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.reservationService.findReservationById(id);
  }

  @Get('guest/:guestId')
  async getByGuest(@Param('guestId') guestId: number) {
    return await this.reservationService.findByGuest(guestId);
  }

  @Get('status/:status')
  async getByStatus(@Param('status') status: number) {
    return await this.reservationService.findByStatus(status);
  }

  @Post()
  async save(@Body() data: Reservation) {
    return await this.reservationService.saveReservation(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Reservation) {
    return await this.reservationService.updateReservation(id, data);
  }
}
