import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { uri } from './config/mongoDb';
import {
  adminAuthMiddleware,
  subfleetAuthMiddleware,
  userAuthMiddleware,
} from './middleware/authMiddleware';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { SubfleetModule } from './subfleet/subfleet.module';
import { SubfleetController } from './subfleet/subfleet.controller';
import { GuestModule } from './guest/guest.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(uri),
    AdminModule,
    SubfleetModule,
    GuestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(userAuthMiddleware).forRoutes(UserController);
    consumer.apply(adminAuthMiddleware).forRoutes(AdminController);
    consumer.apply(subfleetAuthMiddleware).forRoutes(SubfleetController);
  }
}
