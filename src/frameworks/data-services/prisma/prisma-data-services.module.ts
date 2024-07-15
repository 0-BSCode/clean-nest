import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaDataServicesService } from './prisma-data-services.service';
import { IDataServices } from 'src/core/abstracts';
import { PrismaAuthorsRepository } from './repositories/prisma-authors-repository';
import { PrismaBooksRepository } from './repositories/prisma-books-repository';

@Module({
  providers: [
    PrismaService,
    PrismaAuthorsRepository,
    PrismaBooksRepository,
    {
      provide: IDataServices,
      useClass: PrismaDataServicesService,
    },
  ],
  exports: [IDataServices],
})
export class PrismaDataServicesModule {}
