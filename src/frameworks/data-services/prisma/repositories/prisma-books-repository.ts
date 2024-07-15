import { Injectable } from '@nestjs/common';
import { IGenericRepository } from 'src/core/abstracts';
import { Book } from 'src/core/entities';
import { PrismaService } from '../prisma.service';
import { PrismaBookMapper } from '../mappers/prisma-book-mapper';

@Injectable()
export class PrismaBooksRepository implements IGenericRepository<Book> {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Book[]> {
    const prismaBooks = await this.prismaService.book.findMany({
      include: {
        authors: true,
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
        authors: true,
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

    const prismaBook = await this.prismaService.book.create({
      data: prismaBookData,
    });

    const book = PrismaBookMapper.toDomain(prismaBook);
    return book;
  }

  async update(id: number, item: Book): Promise<Book> {
    const prismaBookData = PrismaBookMapper.toPrisma(item);

    const prismaBook = await this.prismaService.book.update({
      where: {
        id,
      },
      data: prismaBookData,
    });

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
