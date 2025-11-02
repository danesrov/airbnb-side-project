import { Global, Module } from '@nestjs/common';
import { DatabaseConnection } from './db-connect';
import { DABATASE_CONST } from './tokens';
import { DatabaseService } from './db.service';

@Global()
@Module({
  imports: [DatabaseConnection],
  providers: [{ provide: DABATASE_CONST.SERVICE, useClass: DatabaseService }],
  exports: [DABATASE_CONST.SERVICE],
})
export class DatabaseCoreModule {}
