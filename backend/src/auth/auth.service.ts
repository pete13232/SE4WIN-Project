import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { ForbiddenError } from 'apollo-server-errors';
import LoginUserInput from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserInput: LoginUserInput): Promise<any> {
    const user = await this.usersService.findByEmail(loginUserInput);

    //Can compate with input password not need to hash
    const passwordMatch = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    if (user && passwordMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new ForbiddenError('Incorrect pasword');
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<string> {
    const user = await this.validateUser(loginUserInput);

    const payload = { email: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });

    const user = this.usersService.findByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}
