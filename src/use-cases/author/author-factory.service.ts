// Maps DTO to objects required by data service

import { Injectable } from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/core/dtos/author.dto';
import { Author } from 'src/core/entities';

@Injectable()
export class AuthorFactoryService {
  createAuthor(dto: CreateAuthorDto) {
    const author = new Author();
    author.name = dto.name;
    author.description = dto.description;
    return author;
  }

  updateAuthor(dto: UpdateAuthorDto) {
    const author = new Author();
    author.name = dto.name;
    author.description = dto.description;
    return author;
  }
}
