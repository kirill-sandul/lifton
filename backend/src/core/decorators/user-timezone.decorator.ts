import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserTimeZone = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    const tzHeader = request.headers['x-user-timezone'];

    if (tzHeader) {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: tzHeader });

        return tzHeader;
      } catch (e) {
        return 'UTC';
      }
    }

    return 'UTC';
  },
);
