/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ForbiddenError } from 'apollo-server-errors';
import LoginUserInput from './dto/login-user.input';
import { JwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validating User Credentials 
   * 
   * parameter: loginUserInput 
   * return: User Information 
   */
  async validateUser(loginUserInput: LoginUserInput): Promise<any> {

    //Find user by Email
    const user = await this.usersService.findByEmail(loginUserInput);

    //Compare password
    const passwordMatch = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    //Check if Email and password are correct
    if (user && passwordMatch) {
      const { password, ...result } = user;
      
      //Return user information
      return result;

    //Throw error if not correct
    } else {
      throw new ForbiddenError('Incorrect pasword');
    }
  }

  /**
   * Log User In
   * 
   * parameter: loginUserInput 
   * return:  
   */
  async login(loginUserInput: LoginUserInput): Promise<string> {

    //Validate user
    const user = await this.validateUser(loginUserInput);

    //Pack payload
    const payload = { email: user.email, role: user.role, sub: user.id };

    //Sign token
    return this.jwtService.sign(payload);
  }

  /**
   * Verify User 
   * 
   * parameter: token 
   * return: User
   */
  async verify(token: string): Promise<User> {

    //Decode token
    const decoded = this.jwtService.verify(token, {
      secret: JwtConstants.secret,
    });

    //Find user by decoded Email
    const user = this.usersService.findByEmail({ email: decoded.email });
    
    //Throw error if not found
    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}
