import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WishListModule } from './wish-list/wish-list.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// ==== entities ====
import { User } from './user/entity/user.entity';
import { WishList } from './wish-list/entity/wish-list.entity';
// import { JwtVarifyMiddleware } from './_middleware/jwt-varify/jwt-varify.middleware';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'nest_angular_test',
      entities: [User, WishList],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    WishListModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(JwtVarifyMiddleware).forRoutes('wish-list');
  // }
}
