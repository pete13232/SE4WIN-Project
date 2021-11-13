import { Module } from '@nestjs/common';
import { DefaultService } from './default.service';
import { DefaultResolver } from './default.resolver';

@Module({
  providers: [DefaultResolver, DefaultService]
})
export class DefaultModule {}
