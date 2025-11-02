export interface IRepository<T, K> {
  findAll(): Promise<T[]>;
  getById(id: K): Promise<T | null>;
  existsById(id: K): Promise<boolean>;
  save(entity: T): Promise<T | null>;
}
