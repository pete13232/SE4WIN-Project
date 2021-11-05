import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenResolver } from './authen.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthenResolver, AuthenService]
})
export class AuthenModule {}
