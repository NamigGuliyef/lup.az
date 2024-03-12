import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../config/jsonwebtoken';
import { User } from '../user/model/user.schema';

// user olub olmadigi butun sehiflere kecidler zamani yoxlanilir
export class userAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    // token olub olmadigi yoxlanilir
    if (!token) throw new HttpException('No auth token', HttpStatus.NOT_FOUND);
    verify(token, jwtSecret, (err: any, user: User) => {
      if (err) {
        throw new HttpException('Invalid auth token', HttpStatus.FORBIDDEN);
      } else if (user.role !== 'user') {
        throw new HttpException('You are not user', HttpStatus.FORBIDDEN);
      } else {
        req.user = user;
        next();
      }
    });
  }
}

// admin olub olmadigi yoxlanilir
export class adminAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new HttpException('No auth token', HttpStatus.NOT_FOUND);
    verify(token, jwtSecret, (err: any, admin: User) => {
      if (err) {
        throw new HttpException('Invalid auth token', HttpStatus.FORBIDDEN);
      } else if (admin.role !== 'admin') {
        throw new HttpException('You are not admin', HttpStatus.FORBIDDEN);
      } else {
        req.admin = admin;
        next();
      }
    });
  }
}

// sub fleet olub olmadigi yoxlanilir
export class subfleetAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new HttpException('No auth token', HttpStatus.NOT_FOUND);
    verify(token, jwtSecret, (err: any, subfleet: User) => {
      if (err) {
        throw new HttpException('Invalid auth token', HttpStatus.FORBIDDEN);
      } else if (subfleet.role !== 'subfleet') {
        throw new HttpException('You are not subfleet', HttpStatus.FORBIDDEN);
      } else {
        req.subfleet = subfleet;
        next();
      }
    });
  }
}
