import { Author, Book } from 'src/core/entities';
import { Author as PrismaAuthor } from '@prisma/client';

export class PrismaAuthorMapper {
  private constructor() {
    throw new Error('PrismaAuthorMapper is a static class');
  }

  public static toPrisma(author: Author): PrismaAuthor {
    return {
      id: author.id,
      name: author.name,
      description: author.description,
    };
  }

  public static toDomain(
    prismaAuthor: PrismaAuthor & { books?: { book: Omit<Book, 'authors'> }[] },
  ): Author {
    return {
      id: prismaAuthor.id,
      name: prismaAuthor.name,
      description: prismaAuthor.description,
      books:
        prismaAuthor.books?.map((book) => ({
          ...book.book,
          authors: [],
        })) || [],
    };
  }
}
