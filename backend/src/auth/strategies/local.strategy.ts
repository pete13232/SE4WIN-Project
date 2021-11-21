import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(loginUserInput: any): Promise<any> {
    const user = await this.authService.validateUser(loginUserInput);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
