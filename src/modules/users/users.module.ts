import { Module } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { TOKENS } from 'src/core/tokens';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  providers: [
    {
      provide: TOKENS.USER.REPOSITORY,
      useClass: UserRepository,
    },
    UserService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
