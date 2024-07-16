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
import { CreateBookDto, UpdateBookDto } from 'src/core/dtos/book.dto';
import { BookUseCases } from 'src/use-cases/book/book.use-case';

@Controller('book')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get()
  getAll() {
    return this.bookUseCases.getAllBooks();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.bookUseCases.getBookById(id);
  }

  @Post()
  createBook(@Body(ValidationPipe) createBookDto: CreateBookDto) {
    return this.bookUseCases.createBook(createBookDto);
  }

  @Put(':id')
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ) {
    return this.bookUseCases.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookUseCases.deleteBook(id);
  }
}
