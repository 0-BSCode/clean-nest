export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract get(id: number): Promise<T | null>;
  abstract getMany(ids: number[]): Promise<T[]>;
  abstract create(item: T): Promise<T>;
  abstract update(id: number, item: T): Promise<T>;
  abstract delete(id: number): Promise<T>;
}
