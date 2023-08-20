import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UserService } from "../user/user.service"
import { CacheService } from "../cache/cache.service"
import { RoleService } from "../role/role.service"

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService,RoleService, CacheService],
})
export class AuthModule {}
