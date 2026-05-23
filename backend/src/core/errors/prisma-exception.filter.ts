import { ArgumentsHost, Catch, ConflictException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "src/generated/prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message
        });
        throw new ConflictException('Unique constraint violated');
      }
      default:
        super.catch(exception, host);
        throw new Error(exception.message);
    }
  }
}