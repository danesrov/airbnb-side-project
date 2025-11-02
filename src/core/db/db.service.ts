import { Injectable } from '@nestjs/common';
import { IDatabaseService } from './abstracts/db.service';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class DatabaseService implements IDatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return this.dataSource.query(sql, params);
  }

  async queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows[0] ?? null;
  }

  async transac<T>(run: (qr: QueryRunner) => Promise<T>): Promise<T> {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const res = await run(qr);
      await qr.commitTransaction();
      return res;
    } catch (e) {
      await qr.rollbackTransaction();
      throw e;
    } finally {
      await qr.release();
    }
  }
}
