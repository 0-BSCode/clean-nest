import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/core/dtos/author.dto';
import { Author } from 'src/core/entities';
import { AuthorFactoryService } from './author-factory.service';

@Injectable()
export class AuthorUseCases {
  constructor(
    private readonly dataService: IDataServices,
    private readonly authorFactoryService: AuthorFactoryService,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    try {
      return await this.dataService.authors.getAll();
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async getAuthorById(id: number): Promise<Author> {
    try {
      const author = await this.dataService.authors.get(id);

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      return author;
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorFactoryService.createAuthor(createAuthorDto);

    try {
      return await this.dataService.authors.create(author);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const authorEntity = await this.getAuthorById(id);

    try {
      const author = this.authorFactoryService.updateAuthor(
        authorEntity,
        updateAuthorDto,
      );
      return await this.dataService.authors.update(id, author);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }

  async deleteAuthor(id: number): Promise<Author> {
    await this.getAuthorById(id);
    try {
      return await this.dataService.authors.delete(id);
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }
    }
  }
}
