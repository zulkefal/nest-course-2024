import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AnotherUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Another user middleware');
    next();
  }
}
