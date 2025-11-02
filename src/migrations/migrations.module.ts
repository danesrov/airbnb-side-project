import { Module } from '@nestjs/common';
import { DatabaseCoreModule } from 'src/core/db/db-core.module';
import { MigrationsRunnerService } from './migrations-runner.service';

@Module({
  imports: [DatabaseCoreModule],
  providers: [MigrationsRunnerService],
  exports: [MigrationsRunnerService],
})
export class MigrationsModule {}
