import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { CreateAuthorDto } from 'src/core/dtos/author.dto';
import { AuthorUseCases } from 'src/use-cases/author/author.use-case';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get()
  getAll() {
    return this.authorUseCases.getAllAuthors();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.authorUseCases.getAuthorById(id);
  }

  @Post()
  createAuthor(@Body(ValidationPipe) createAuthorDto: CreateAuthorDto) {
    return this.authorUseCases.createAuthor(createAuthorDto);
  }
}
