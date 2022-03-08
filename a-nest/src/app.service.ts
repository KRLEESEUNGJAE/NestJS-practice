import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Service는 요청과 응답에 대해서는 모른다.
@Injectable()
export class AppService {
  constructor(private readonly ConfigService: ConfigService) {}

  getUser(): string {
    return 'Hello World!';
  }

  getDotEnv() {
    return process.env.DOTENVTEST;
  }

  getDBPW() {
    return this.ConfigService.get('DB_PASSWORD');
    // process.env.DB_PASSWORD
  }

  postUser(): string {
    return 'Hello World!';
  }
}
