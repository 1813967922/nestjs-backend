import { Controller, Get, Inject, UseGuards } from "@nestjs/common"
import { InjectEntityManager } from "@nestjs/typeorm"
import { EntityManager } from "typeorm"
import { User } from "./modules/user/entities/user.entity"
import { Role } from "./modules/role/entities/role.entity"
import { Permission } from "./modules/permission/entities/permission.entity"
import { IsPublic } from "./common/decorator/ispublic.decorator"
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger"
import { hasPermission } from "./common/decorator/has.permission.decorator"
import { CacheService } from "./modules/cache/cache.service"

@ApiBearerAuth()
@Controller()
export class AppController {
  @InjectEntityManager()
  private readonly manager: EntityManager

  @Inject()
  private cacheService:CacheService

  @Get("init")
  async init() {
    const user1 = new User()
    user1.username = "张三1111"
    user1.password = "123456"
    const user2 = new User()
    user2.username = "李四1111"
    user2.password = "123456"
    const user3 = new User()
    user3.username = "王五1111"
    user3.password = "123456"

    const role1 = new Role()
    role1.rolename = "超级管理员"
    role1.desc = "拥有所有权限"
    role1.permissions = []
    const role2 = new Role()
    role2.rolename = "普通用户"
    role2.desc = "拥有个别权限"
    role2.permissions = []

    const per1 = new Permission()
    per1.permissionName = "aaa"
    per1.iden = "aaa"
    per1.desc = "aaa"
    const per2 = new Permission()
    per2.permissionName = "bbb"
    per2.iden = "bbb"
    per2.desc = "bbb"
    const per3 = new Permission()
    per3.permissionName = "ccc"
    per3.iden = "ccc"
    per3.desc = "ccc"

    role1.permissions = [per1, per2]
    role2.permissions = [per1, per2, per3]

    user1.roles = [role1, role2]
    user2.roles = [role2]
    user3.roles = [role1, role2]

    await this.manager.save(Permission, [per1, per2, per3])
    await this.manager.save(Role, [role1, role2])
    await this.manager.save(User, [user1, user2, user3])

    return "done"
  }

  @ApiOperation({summary:"公共接口不需要登陆"})
  @IsPublic()
  @Get("test")
  async test() {
    await this.cacheService.setValue("test", "test")
    const data = await this.cacheService.getValue("test")
    console.log(1)
    return data
  }

  @ApiOperation({summary:"保护接口需要登陆且需要test:test权限"})
  @hasPermission("test:test")
  @Get("test1")
  test1() {
    return "需要权限"
  }

  @ApiOperation({summary:"保护接口需要登陆"})
  @Get("test2")
  async test2() {
    await this.cacheService.setValue("test", "test")
    const data = await this.cacheService.getValue("test")
    console.log(1)
    return data
  }
}
