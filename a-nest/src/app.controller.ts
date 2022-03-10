import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

// Controller는 요청과 응답에 대해서만 안다.
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('CUSTOM_KEY') private readonly customValue,
  ) {}

  @Get() // dotenv test
  getDotEnv() {
    return this.appService.getDotEnv();
  }

  @Get('user') // GET /abc/user
  getHello(): string {
    return this.appService.getUser();
  }

  @Post('user') // POST /abc/user
  postHello(): string {
    return this.appService.postUser();
  }
}
