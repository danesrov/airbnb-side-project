import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseCoreModule } from './core/db/db-core.module';
import { UsersModule } from './modules/users/users.module';
import { HostsModule } from './modules/hosts/hosts.module';
import { SeasonModule } from './modules/seasons/seasons.module';
import { ZoneModule } from './modules/zones/zones.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseCoreModule,
    UsersModule,
    HostsModule,
    SeasonModule,
    ReservationsModule,
    ZoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
