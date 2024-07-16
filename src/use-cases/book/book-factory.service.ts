import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from 'src/core/dtos/book.dto';
import { Author, Book } from 'src/core/entities';

@Injectable()
export class BookFactoryService {
  createBook(dto: CreateBookDto, authors: Author[]): Book {
    const book = new Book();
    book.title = dto.title;
    book.description = dto.description;
    book.price = dto.price;
    book.authors = authors;
    return book;
  }

  updateBook(dto: UpdateBookDto, authors: Author[]): Book {
    const book = new Book();
    book.title = dto.title;
    book.description = dto.description;
    book.price = dto.price;
    book.authors = authors;
    return book;
  }
}
