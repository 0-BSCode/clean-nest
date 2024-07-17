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
import { CreateBookDto, UpdateBookDto } from 'src/core/dtos/book.dto';
import { BookUseCases } from 'src/use-cases/book/book.use-case';

@Controller('book')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get()
  getAll() {
    this.logger.log('Getting all books');
    return this.bookUseCases.getAllBooks();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Getting book ${id}`);
    return this.bookUseCases.getBookById(id);
  }

  @Post()
  createBook(@Body(ValidationPipe) createBookDto: CreateBookDto) {
    this.logger.log(
      `Creating book with payload ${JSON.stringify(createBookDto)}`,
    );
    return this.bookUseCases.createBook(createBookDto);
  }

  @Put(':id')
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ) {
    this.logger.log(
      `Updating book ${id} with payload ${JSON.stringify(updateBookDto)}`,
    );
    return this.bookUseCases.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Deleting book ${id}`);
    return this.bookUseCases.deleteBook(id);
  }
}
