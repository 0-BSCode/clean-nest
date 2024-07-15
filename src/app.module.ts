import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataServicesModule } from './services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
