import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { uri } from './config/mongoose';

@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
