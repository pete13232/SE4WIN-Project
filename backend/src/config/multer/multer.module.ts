import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
})
export class MulterConfigModule {}
