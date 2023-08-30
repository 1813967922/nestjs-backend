import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  UnauthorizedException,
} from "@nestjs/common"
/**
 * 认证授权异常过滤器
 */
@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(UnauthorizedExceptionFilter.name)

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const status = exception.getStatus()

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
