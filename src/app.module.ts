import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WishListModule } from './wish-list/wish-list.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtVarifyMiddleware } from './_middleware/jwt-varify/jwt-varify.middleware';
// import { JwtModule } from '@nestjs/jwt';

// ==== entities ====
import { User } from './user/entity/user.entity';
import { WishList } from './wish-list/entity/wish-list.entity';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, WishList],
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        { name: 'short', ttl: 2 * 1000, limit: 1 },
        { name: 'long', ttl: 60 * 1000, limit: 20 },
      ],
    }),
    AuthModule,
    WishListModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
  // constructor(private configService: ConfigService) {}
  // onModuleInit() {
  //   const dbHost = this.configService.get<string>('DB_HOST');
  //   console.log(dbHost);
  // }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(JwtVarifyMiddleware).forRoutes('wish-list');
  // }
}
