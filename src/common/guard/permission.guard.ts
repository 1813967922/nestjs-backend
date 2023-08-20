import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { Observable } from "rxjs"
import { Reflector } from "@nestjs/core"
import { DecoratorConstant } from "../constant/decorator.constant"
import { Request } from "express"

@Injectable()
export class PermissionGuard implements CanActivate {
  // 反射
  @Inject(Reflector)
  private reflector: Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const user = request.user
    if (!user) {
      return true
    }
    // 需要的权限
    const permissions: string[] = this.reflector.getAllAndOverride(
      DecoratorConstant.HASPERMISSIONS,
      [context.getClass(), context.getHandler()],
    )
    if (!permissions) {
      return true
    }
    const hasPermission = user.permissions.find((item) =>
      permissions.includes(item),
    )
    if (!hasPermission) {
      throw new UnauthorizedException("没有权限")
    }
    return true
  }
}
