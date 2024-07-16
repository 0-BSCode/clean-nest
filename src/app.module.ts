import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DataServicesModule } from './services/data-services/data-services.module';
import { AuthorUseCasesModule } from './use-cases/author/author-use-cases.module';
import { BookUseCasesModule } from './use-cases/book/book-use-cases.module';
import { AuthorController } from './controllers/author.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { BookController } from './controllers/book.controller';

@Module({
  imports: [DataServicesModule, AuthorUseCasesModule, BookUseCasesModule],
  controllers: [AppController, AuthorController, BookController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
