import { Get, Injectable, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './authen/local-auth.guard';

@Injectable()
export class AppService {
  constructor(private readonly appService: AppService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(): any{
    return {}
  }

  @Get('secured')
  getHello(): string {
    return 'Hello World!';
  }
}
