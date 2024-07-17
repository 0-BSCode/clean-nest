import { IGenericRepository } from 'src/core/abstracts';
import { PrismaService } from '../prisma.service';
import { Author } from 'src/core/entities';
import { Injectable } from '@nestjs/common';
import { PrismaAuthorMapper } from '../mappers/prisma-author-mapper';

@Injectable()
export class PrismaAuthorsRepository implements IGenericRepository<Author> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Author[]> {
    const prismaAuthors = await this.prisma.author.findMany({
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    const authors = prismaAuthors.map(PrismaAuthorMapper.toDomain);
    return authors;
  }

  async getMany(ids: number[]): Promise<Author[]> {
    const prismaAuthors = await this.prisma.author.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    const authors = prismaAuthors.map(PrismaAuthorMapper.toDomain);
    return authors;
  }

  async get(id: number): Promise<Author | null> {
    const prismaAuthor = await this.prisma.author.findFirst({
      where: {
        id,
      },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!prismaAuthor) {
      return null;
    }

    const author = PrismaAuthorMapper.toDomain(prismaAuthor);
    return author;
  }

  async create(item: Author): Promise<Author> {
    const prismaAuthorData = PrismaAuthorMapper.toPrisma(item);

    const prismaAuthor = await this.prisma.author.create({
      data: prismaAuthorData,
    });

    const author = PrismaAuthorMapper.toDomain(prismaAuthor);
    return author;
  }

  async update(id: number, item: Author): Promise<Author> {
    const prismaAuthorData = PrismaAuthorMapper.toPrisma(item);
    const prismaAuthor = await this.prisma.author.update({
      where: {
        id,
      },
      data: prismaAuthorData,
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    const author = PrismaAuthorMapper.toDomain(prismaAuthor);
    return author;
  }

  async delete(id: number): Promise<Author> {
    const prismaAuthor = await this.prisma.author.delete({
      where: {
        id,
      },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    const author = PrismaAuthorMapper.toDomain(prismaAuthor);
    return author;
  }
}
