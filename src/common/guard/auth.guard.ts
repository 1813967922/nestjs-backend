import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { WebConstant } from "../constant/web.constant"
import { DecoratorConstant } from "../constant/decorator.constant"
import { Request } from "express"
import { Reflector } from "@nestjs/core"
import { CacheService } from "../../modules/cache/cache.service"
import { RedisConstant } from "../constant/redis.constant"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthGuard implements CanActivate {
  // 缓存服务
  @Inject()
  private cacheService: CacheService
  // JWT服务
  @Inject(JwtService)
  private jwtService: JwtService
  // 反射
  @Inject(Reflector)
  private reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    // 跳过白名单效验
    const isPublic = this.reflector.getAllAndOverride(
      DecoratorConstant.ISPUBLIC,
      [context.getClass(), context.getHandler()],
    )
    if (isPublic) {
      return true
    }
    // 获取请求头上的认证令牌
    const authorization = request.headers[WebConstant.AUTHORIZATION]
    const token = authorization && authorization.split(" ")[1]
    // 判断当前令牌是否在缓存中的黑名单中
    const exists = await this.cacheService.existsKey(
      RedisConstant.TOKEN_BLACKLIST + token,
    )
    if (!authorization || exists) {
      throw new UnauthorizedException("登陆信息失效请重新登陆")
    }
    try {
      this.jwtService.verify(token)
      // 解析令牌获取用户信息
      const data = this.jwtService.decode(token) as JwtPlayLod
      // 根据用户id查询该用户的角色及权限信息放到request中方便后续使用
      const roles = await this.cacheService.getValue(
        RedisConstant.USER_ROLES + data.userId,
      )
      const permissions = await this.cacheService.getValue(
        RedisConstant.USER_PERMISSIONS + data.userId,
      )
      request.user = {
        userId: data.userId,
        nickName: data.nickName,
        roles: JSON.parse(roles),
        permissions: JSON.parse(permissions),
      }
      return true
    } catch (e) {
      throw new UnauthorizedException("登陆信息失效请重新登陆")
    }
  }
}
