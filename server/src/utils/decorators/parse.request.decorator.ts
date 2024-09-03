import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { PayloadDTO } from 'src/signin/dto/payload.dto';

export const ParseRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: PayloadDTO }>();
    return request.user;
  },
);
