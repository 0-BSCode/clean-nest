import { Injectable } from '@nestjs/common';
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

  getAllAuthors(): Promise<Author[]> {
    return this.dataService.authors.getAll();
  }

  getAuthorById(id: number): Promise<Author | null> {
    return this.dataService.authors.get(id);
  }

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorFactoryService.createAuthor(createAuthorDto);
    return this.dataService.authors.create(author);
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = this.authorFactoryService.updateAuthor(updateAuthorDto);
    return this.dataService.authors.update(id, author);
  }

  deleteAuthor(id: number): Promise<Author> {
    return this.dataService.authors.delete(id);
  }
}
