import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBooks(): string[] {
    return ['Nestjs', 'ReactJS', 'Node'];
  }
}
