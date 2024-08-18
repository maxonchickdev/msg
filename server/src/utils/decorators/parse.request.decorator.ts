import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayloadDTO } from 'src/profile/dto/jwt.payload.dto';

export const ParseRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: JwtPayloadDTO }>();
    return request.user;
  },
);
