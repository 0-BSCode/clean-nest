import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaDataServicesService } from './prisma-data-services.service';
import { IDataServices } from 'src/core/abstracts';

@Module({
  providers: [
    PrismaService,
    {
      provide: IDataServices,
      useClass: PrismaDataServicesService,
    },
  ],
  exports: [IDataServices],
})
export class PrismaDataServicesModule {}
