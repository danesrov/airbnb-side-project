// src/hosts/hosts.module.ts
import { Module } from '@nestjs/common';
import { HostsController } from './hosts.controller';
import { HostsService } from './hosts.service';
import { HostsRepository } from './hosts.repository';
import { TOKENS } from 'src/core/tokens';

@Module({
  controllers: [HostsController],
  providers: [
    { provide: TOKENS.HOSTS.REPOSITORY, useClass: HostsRepository },
    HostsService,
  ],
  exports: [HostsService],
})
export class HostsModule {}
