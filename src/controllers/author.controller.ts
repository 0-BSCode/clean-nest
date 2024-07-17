import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger = new Logger(AuthorController.name);
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get()
  getAll() {
    this.logger.log('Getting all authors');
    return this.authorUseCases.getAllAuthors();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Getting author ${id}`);
    return this.authorUseCases.getAuthorById(id);
  }

  @Post()
  createAuthor(@Body(ValidationPipe) createAuthorDto: CreateAuthorDto) {
    this.logger.log(
      `Creating author with payload ${JSON.stringify(createAuthorDto)}`,
    );
    return this.authorUseCases.createAuthor(createAuthorDto);
  }

  @Put(':id')
  updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateAuthorDto: UpdateAuthorDto,
  ) {
    this.logger.log(
      `Updating author ${id} with payload ${JSON.stringify(updateAuthorDto)}`,
    );
    return this.authorUseCases.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Deleting author ${id}`);
    return this.authorUseCases.deleteAuthor(id);
  }
}
