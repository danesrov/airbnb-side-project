import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { ListingsRepository } from './listings.repository';
import { TOKENS } from 'src/core/tokens';


@Module({

  controllers: [ListingsController],
  providers: [
    { provide: TOKENS.LISTINGS.REPOSITORY, useClass: ListingsRepository },
    ListingsService,
  ],
  exports: [ListingsService],
})
export class ListingsModule {}
