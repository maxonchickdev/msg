import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123987Maxondev!',
      database: 'reg_log_app_nestjs',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController, AuthController],

  providers: [],
})
export class AppModule {}
