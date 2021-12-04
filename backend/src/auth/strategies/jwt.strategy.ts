/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }

  /**
   * Validate User
   * 
   * parameter: payload 
   * return: User Information 
   */
  async validate(payload: any) {
    const { password, address, phoneNumber, createdAt, updatedAt, ...rest } =
      await this.userService.findOne(payload.sub);
    return rest;
  }
}
