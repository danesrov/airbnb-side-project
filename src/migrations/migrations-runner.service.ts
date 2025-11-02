import { Inject, Injectable, Logger } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';
import { type IDatabaseService } from 'src/core/db/abstracts/db.service';
import { TOKENS } from 'src/core/tokens';
import { MIGRATION_QUERIES } from './queries/create-table';

@Injectable()
export class MigrationsRunnerService {
  private readonly logger = new Logger(MigrationsRunnerService.name);
  private readonly migrationsDir = path.resolve(__dirname, 'sql');
  private applied: Set<string>;
  private files: string[] = [];

  constructor(
    @Inject(TOKENS.DB_TOKENS.SERVICE)
    private readonly db: IDatabaseService,
  ) {}

  async runPending(): Promise<void> {
    await this.db.transac(async (qr) => {
      await qr.query(MIGRATION_QUERIES.CREATE_CONTROL_TABLE);
    });
    this.setFiles();
    await this.handleApliedRows();
    await this.handleSqlFiles();

    this.logger.log('✔ Migraciones completadas');
  }

  private setFiles() {
    this.files = fs
      .readdirSync(this.migrationsDir)
      .filter((f) => f.toLowerCase().endsWith('.sql'))
      .sort((a, b) => a.localeCompare(b));
  }

  private async handleSqlFiles() {
    if (this.files.length === 0) {
      this.logger.log('No hay scripts SQL en /sql. Nada que migrar.');
      return;
    }

    for (const file of this.files) {
      if (this.applied.has(file)) {
        this.logger.debug(`✔ Ya aplicada: ${file}`);
        continue;
      }

      const fullpath = path.join(this.migrationsDir, file);
      const sql = fs.readFileSync(fullpath, 'utf8');

      this.logger.log(`▶ Ejecutando: ${file}`);

      await this.db.transac(async (qr) => {
        await qr.query(sql);
        await qr.query(`INSERT INTO _migrations(name) VALUES ($1)`, [file]);
      });

      this.logger.log(`✅ OK: ${file}`);
    }

    this.logger.log('✔ Migraciones completadas');
  }

  private async handleApliedRows() {
    const appliedRows = await this.db.query<{ name: string }>(
      `SELECT name FROM _migrations`,
    );
    this.applied = new Set(appliedRows.map((r) => r.name));
    await this.handleSqlFiles();
  }
}
