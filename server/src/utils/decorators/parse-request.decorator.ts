import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { JwtDto } from '../dto/jwt.dto';

export const ParseRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: JwtDto }>();
    return request.user;
  },
);
