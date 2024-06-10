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
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123987Maxondev!',
      database: 'CRUD_WITH_NESTJS',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, UsersController, AuthController],

  providers: [],
})
export class AppModule {}
