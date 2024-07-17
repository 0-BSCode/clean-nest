import { Book as PrismaBook } from '@prisma/client';
import { Author, Book } from 'src/core/entities';

export class PrismaBookMapper {
  private constructor() {
    throw new Error('PrismaBookMapper is a static class');
  }

  public static toPrisma(book: Book): PrismaBook {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      price: book.price,
    };
  }

  public static toDomain(
    prismaBook: PrismaBook & { authors?: { author: Omit<Author, 'books'> }[] },
  ): Book {
    return {
      id: prismaBook.id,
      title: prismaBook.title,
      description: prismaBook.description,
      price: prismaBook.price,
      authors:
        prismaBook.authors?.map((author) => ({
          ...author.author,
          books: [],
        })) || [],
    };
  }
}
