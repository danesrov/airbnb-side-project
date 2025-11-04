import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return { users: await this.userService.findAllUsers() };
  }

  @Post()
  async save(@Body() createDto: RegisterDto) {
    return this.userService.saveUser(createDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
