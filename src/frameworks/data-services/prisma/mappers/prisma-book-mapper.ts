import { Book as PrismaBook } from '@prisma/client';
import { Book } from 'src/core/entities';

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

  public static toDomain(prismaBook: PrismaBook): Book {
    return {
      id: prismaBook.id,
      title: prismaBook.title,
      description: prismaBook.description,
      price: prismaBook.price,
      // TODO: Extract authors from prismaBook
      authors: [],
    };
  }
}
