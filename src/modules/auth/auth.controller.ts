import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
  Request,
  UnauthorizedException,
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger"
import { SigninDto } from "./dto/signin.dto"
import { SignupDto } from "./dto/signup.dto"
import { WebConstant } from "src/common/constant/web.constant"
import { IsPublic } from "src/common/decorator/ispublic.decorator"
import { CacheService } from "../cache/cache.service"
import { RedisConstant } from "src/common/constant/redis.constant"
import { JwtService } from "@nestjs/jwt"
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston"

@IsPublic()
@ApiTags("认证授权相关")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
  ) {}

  @Post("signin")
  @ApiOperation({ summary: "登录", description: "用户登陆获取token" })
  @ApiBody({
    type: SigninDto,
  })
  async signin(@Body() signin: SigninDto) {
    this.logger.log("用户登录:#{username}", signin)
    return await this.authService.signin(signin)
  }

  @Post("signup")
  @ApiOperation({ summary: "注册", description: "用户注册" })
  async signup(@Body() Signup: SignupDto) {}

  @ApiBearerAuth()
  @Get("logout")
  @ApiOperation({ summary: "登出", description: "用户退出登录" })
  async logout(@Request() req: Request) {
    try {
      const authorization = req.headers[WebConstant.AUTHORIZATION]
      const token = authorization && authorization.split(" ")[1]
      const data = this.jwtService.decode(token) as JwtPlayLod
      const time = Math.max(
        0,
        data.exp - Number((new Date().getTime() / 1000).toFixed()),
      )
      // 把token加到缓存黑名单
      await this.cacheService.setValueWithEx(
        RedisConstant.TOKEN_BLACKLIST + token,
        token,
        time,
      )
      // 删除缓存中的角色及权限
      await this.cacheService.delValue(RedisConstant.USER_ROLES + data.id)
      await this.cacheService.delValue(RedisConstant.USER_PERMISSIONS + data.id)
    } catch (e) {
      return "退出登陆成功"
    }
    return "退出登陆成功"
  }

  @Get("refreshToken")
  @ApiOperation({ summary: "刷新令牌", description: "刷新令牌" })
  async refreshToken(@Request() request: Request) {
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
    return this.authService.refreshToken(token)
  }
}
