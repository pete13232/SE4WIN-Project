import { Get, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './authen/local-auth.guard';

@Injectable()
export class AppService {
  constructor(private readonly appService: AppService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any{
    return req.user;
  }

  @Get('secured')
  getHello(): string {
    return 'Hello World!';
  }
}
