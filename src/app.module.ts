import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WishListModule } from './wish-list/wish-list.module';

@Module({
  imports: [AuthModule, WishListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
