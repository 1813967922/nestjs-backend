import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  Logger,
  LoggerService,
  UnauthorizedException,
} from "@nestjs/common"

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(AllExceptionFilter.name)

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const status = exception.getStatus()

    // 认证授权异常
    if (exception instanceof UnauthorizedException) {
      response.status(status).json({
        code: status,
        data: null,
        message: exception.message,
        timestamp: new Date().toISOString(),
        url: request.originalUrl,
        method: request.method,
      })
    }
  }
}
