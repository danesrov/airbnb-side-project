import { NestFactory } from '@nestjs/core';
import { MigrationsModule } from './migrations.module';
import { MigrationsRunnerService } from './migrations-runner.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MigrationsModule, {
    logger: ['log', 'error', 'warn'],
  });

  try {
    const runner = app.get(MigrationsRunnerService);
    await runner.runPending();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en migraciones:', err);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
