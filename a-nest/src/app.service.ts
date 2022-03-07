import { Injectable } from '@nestjs/common';

// Service는 요청과 응답에 대해서는 모른다.
@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }

  getUser(): string {
    return 'Hello World!';
  }

  postUser(): string {
    return 'Hello World!';
  }
}
