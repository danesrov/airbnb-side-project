import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return { users: await this.userService.findAllUsers() };
  }

  @Post()
  async save() {
    return this.userService.saveUser();
  }
}
