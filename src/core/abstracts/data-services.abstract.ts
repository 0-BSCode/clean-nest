import { Author, Book } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract authors: IGenericRepository<Author>;
  abstract books: IGenericRepository<Book>;
}
