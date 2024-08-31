import { Module } from '@nestjs/common';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { JwtTemporaryStrategy } from './strategies/jwt.temporary.strategy';
import { TwofaController } from './twofa.controller';
import { TwofaService } from './twofa.service';

@Module({
  imports: [UsersModule],
  controllers: [TwofaController],
  providers: [TwofaService, JwtTemporaryStrategy],
})
export class TwofaModule {}
