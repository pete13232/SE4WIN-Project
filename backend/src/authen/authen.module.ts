import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenResolver } from './authen.resolver';

@Module({
  providers: [AuthenResolver, AuthenService]
})
export class AuthenModule {}
