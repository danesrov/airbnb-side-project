import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseCoreModule } from './core/db/db-core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseCoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
