import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { AuthorFactoryService } from './author-factory.service';
import { AuthorUseCases } from './author.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [AuthorUseCases, AuthorFactoryService],
  exports: [AuthorUseCases, AuthorFactoryService],
})
export class AuthorUseCasesModule {}
