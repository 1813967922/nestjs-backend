import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { SigninDto } from "./dto/signin.dto"
import { CacheService } from "../cache/cache.service"
import { RedisConstant } from "src/common/constant/redis.constant"
import { JwtService } from "@nestjs/jwt"
import { RoleService } from "../role/role.service"

@Injectable()
export class AuthService {
  @Inject()
  private cacheService: CacheService

  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(UserService)
  private userService: UserService

  @Inject(RoleService)
  private roleService: RoleService

  async signin(signin: SigninDto) {
    const userExist = await this.userService.loadByUserName(signin.username)
    if (userExist.password !== signin.password) {
      throw new UnauthorizedException("账号密码错误")
    }
    // 获取当前用户的所有角色
    const roleList = await this.userService.findUserRolesById(userExist.id)
    const roles = roleList.map((item) => item.iden)
    // 获取所有角色的所有权限
    const permissions = await this.roleService.findRolePermissionsByRoleId(roleList.map((item) => item.id))
    // 设置角色权限到缓存中
    await this.cacheService.setValue(
      RedisConstant.USER_ROLES + userExist.id,
      JSON.stringify(roles),
    )
    await this.cacheService.setValue(
      RedisConstant.USER_PERMISSIONS + userExist.id,
      JSON.stringify(permissions),
    )

    const access_token = this.jwtService.sign(
      {
        userId: userExist.id,
        username: userExist.username,
      },
      {
        expiresIn: "15m",
      },
    )

    const refresh_token = this.jwtService.sign(
      {
        userId: userExist.id,
        username: userExist.username,
      },
      {
        expiresIn: "30m",
      },
    )

    return {
      id: userExist.id,
      access_token,
      refresh_token,
    }
  }

  async refreshToken(token: string) {
    try {
      const data = this.jwtService.verify(token)
      const user = await this.userService.findUserById(data.userId)
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: "15m",
        },
      )
      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: "30m",
        },
      )
      return {
        access_token,
        refresh_token,
      }
    } catch (e) {
      throw new UnauthorizedException("登陆信息已失效,请重新登陆")
    }
  }
}
