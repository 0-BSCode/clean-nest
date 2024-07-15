import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices, IGenericRepository } from 'src/core/abstracts';
import { Author, Book } from 'src/core/entities';
import { PrismaAuthorsRepository } from './repositories/prisma-authors-repository';
import { PrismaBooksRepository } from './repositories/prisma-books-repository';

@Injectable()
export class PrismaDataServicesService
  implements IDataServices, OnApplicationBootstrap
{
  authors: IGenericRepository<Author>;
  books: IGenericRepository<Book>;

  constructor(
    private readonly authorsRepository: PrismaAuthorsRepository,
    private readonly booksRepository: PrismaBooksRepository,
  ) {}

  onApplicationBootstrap() {
    this.authors = this.authorsRepository;
    this.books = this.booksRepository;
  }
}
