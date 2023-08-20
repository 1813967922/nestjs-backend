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
export class RoleGuard implements CanActivate {
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
    // 需要的角色
    const roles: string[] = this.reflector.getAllAndOverride(
      DecoratorConstant.HASROLES,
      [context.getClass(), context.getHandler()],
    )
    if (!roles) {
      return true
    }
    const hasRole = user.roles.find((item) => roles.includes(item))
    if (!hasRole) {
      throw new UnauthorizedException("角色没有权限")
    }
    return true
  }
}
