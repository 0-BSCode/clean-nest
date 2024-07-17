import { Injectable } from '@nestjs/common';
import { IGenericRepository } from 'src/core/abstracts';
import { Book } from 'src/core/entities';
import { PrismaService } from '../prisma.service';
import { PrismaBookMapper } from '../mappers/prisma-book-mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaBooksRepository implements IGenericRepository<Book> {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Book[]> {
    const prismaBooks = await this.prismaService.book.findMany({
      include: {
        authors: {
          include: {
            author: true,
          },
        },
      },
    });

    const books = prismaBooks.map(PrismaBookMapper.toDomain);
    return books;
  }

  async getMany(ids: number[]): Promise<Book[]> {
    const prismaBooks = await this.prismaService.book.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
      },
    });

    const books = prismaBooks.map(PrismaBookMapper.toDomain);
    return books;
  }

  async get(id: number): Promise<Book | null> {
    const prismaBook = await this.prismaService.book.findFirst({
      where: {
        id,
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!prismaBook) {
      return null;
    }

    const book = PrismaBookMapper.toDomain(prismaBook);
    return book;
  }

  async create(item: Book): Promise<Book> {
    const prismaBookData = PrismaBookMapper.toPrisma(item);
    // Since relationship is explicit, extra layer of nesting is needed to create connection
    // TODO: Integrate into prismaBookData so no extra logic here
    const authorConnections = item.authors.map((author) => {
      return {
        author: {
          connect: {
            id: author.id,
          },
        },
      } as Prisma.BooksOnAuthorsCreateInput;
    });

    const prismaBook = await this.prismaService.book.create({
      data: {
        title: prismaBookData.title,
        description: prismaBookData.description,
        price: prismaBookData.price,
        authors: {
          create: authorConnections,
        },
      },
      include: {
        authors: {
          select: {
            author: true,
          },
        },
      },
    });

    const book = PrismaBookMapper.toDomain(prismaBook);
    return book;
  }

  async update(id: number, item: Book): Promise<Book> {
    const prismaBookData = PrismaBookMapper.toPrisma(item);
    // TODO: Integrate into prismaBookData so no extra logic here
    const authorConnections = item.authors.map((author) => ({
      authorId: author.id,
      bookId: id,
    }));

    const [
      _updatedBookData,
      _deletedConnections,
      _createdConnections,
      prismaBook,
    ] = await this.prismaService.$transaction([
      this.prismaService.book.update({
        where: {
          id,
        },
        data: {
          title: prismaBookData.title,
          description: prismaBookData.description,
          price: prismaBookData.price,
        },
      }),
      this.prismaService.booksOnAuthors.deleteMany({
        where: {
          bookId: id,
        },
      }),
      this.prismaService.booksOnAuthors.createMany({
        data: authorConnections,
      }),
      this.prismaService.book.findFirst({
        where: { id },
        include: {
          authors: {
            include: {
              author: true,
            },
          },
        },
      }),
    ]);

    const book = PrismaBookMapper.toDomain(prismaBook);
    return book;
  }

  async delete(id: number): Promise<Book> {
    const prismaBook = await this.prismaService.book.delete({
      where: {
        id,
      },
    });

    const book = PrismaBookMapper.toDomain(prismaBook);
    return book;
  }
}
