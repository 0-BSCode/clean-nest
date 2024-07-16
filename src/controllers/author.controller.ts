import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/core/dtos/author.dto';
import { AuthorUseCases } from 'src/use-cases/author/author.use-case';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get()
  getAll() {
    return this.authorUseCases.getAllAuthors();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.authorUseCases.getAuthorById(id);
  }

  @Post()
  createAuthor(@Body(ValidationPipe) createAuthorDto: CreateAuthorDto) {
    return this.authorUseCases.createAuthor(createAuthorDto);
  }

  @Put(':id')
  updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorUseCases.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.authorUseCases.deleteAuthor(id);
  }
}
