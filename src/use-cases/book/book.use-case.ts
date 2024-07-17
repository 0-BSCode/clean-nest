import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { BookFactoryService } from './book-factory.service';
import { Author, Book } from 'src/core/entities';
import { CreateBookDto, UpdateBookDto } from 'src/core/dtos/book.dto';

@Injectable()
export class BookUseCases {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly bookFactoryService: BookFactoryService,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    try {
      return await this.dataServices.books.getAll();
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async getBookById(id: number): Promise<Book> {
    try {
      const book = await this.dataServices.books.get(id);

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return book;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const authors = await this.dataServices.authors.getMany(
      createBookDto.authorIds,
    );

    if (authors.length !== createBookDto.authorIds.length) {
      throw new NotFoundException('One or more authors not found');
    }

    const book = this.bookFactoryService.createBook(createBookDto, authors);
    try {
      return await this.dataServices.books.create(book);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const bookEntity = await this.getBookById(id);

    let authors: Author[] = [];
    if (updateBookDto.authorIds) {
      authors = await this.dataServices.authors.getMany(
        updateBookDto.authorIds,
      );

      if (authors.length !== updateBookDto.authorIds.length) {
        throw new NotFoundException('One or more authors not found');
      }

      bookEntity.authors = authors;
    }

    const bookData = this.bookFactoryService.updateBook(
      bookEntity,
      updateBookDto,
    );

    try {
      return await this.dataServices.books.update(id, bookData);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async deleteBook(id: number): Promise<Book> {
    await this.getBookById(id);
    try {
      return await this.dataServices.books.delete(id);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  //   TODO: Add/remove authors
}
