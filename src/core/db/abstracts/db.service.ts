import { QueryRunner } from 'typeorm';

export interface IDatabaseService {
  /** Run raw SQL with secure parameters */
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  /** Run raw SQL with secure parameters */
  queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  /** Execute a transaction */
  transac<T>(run: (qr: QueryRunner) => Promise<T>): Promise<T>;
  
}
