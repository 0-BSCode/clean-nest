import { Module } from '@nestjs/common';
import { BookFactoryService } from './book-factory.service';
import { BookUseCases } from './book.use-case';
import { DataServicesModule } from 'src/services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [BookUseCases, BookFactoryService],
  exports: [BookUseCases, BookFactoryService],
})
export class BookUseCasesModule {}
