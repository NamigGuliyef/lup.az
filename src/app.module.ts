import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { uri } from './config/mongoDb';
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from './middleware/authMiddleware';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(userAuthMiddleware).forRoutes(UserController);
    consumer.apply(adminAuthMiddleware).forRoutes(AdminController);
  }
}
