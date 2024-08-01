import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmationCode } from 'src/utils/entities/confirmation.code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfirmationCodeService {
  constructor(
    @InjectRepository(ConfirmationCode)
    private readonly confirmationCodeRepository: Repository<ConfirmationCode>,
  ) {}

  async createConfirmationCode(
    confirmationCode: string,
  ): Promise<ConfirmationCode> {
    return this.confirmationCodeRepository.create({
      code: confirmationCode,
    });
  }

  async saveConfirmationCode(confirmationCode: ConfirmationCode) {
    return this.confirmationCodeRepository.save(confirmationCode);
  }
}
