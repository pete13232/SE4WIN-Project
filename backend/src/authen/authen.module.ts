import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenResolver } from './authen.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthenResolver, AuthenService, LocalStrategy]
})
export class AuthenModule {}
