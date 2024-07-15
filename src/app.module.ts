import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DataServicesModule } from './services/data-services/data-services.module';
import { AuthorUseCasesModule } from './use-cases/author/author-use-cases.module';
import { BookUseCasesModule } from './use-cases/book/book-use-cases.module';
import { AuthorController } from './controllers/author.controller';

@Module({
  imports: [DataServicesModule, AuthorUseCasesModule, BookUseCasesModule],
  controllers: [AppController, AuthorController],
  providers: [],
})
export class AppModule {}
