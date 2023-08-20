import { Injectable } from "@nestjs/common"
import { InjectEntityManager } from "@nestjs/typeorm"
import { EntityManager, In } from "typeorm"
import { Permission } from "../permission/entities/permission.entity"
import { Role } from "./entities/role.entity"

@Injectable()
export class RoleService {
  @InjectEntityManager()
  private readonly manager: EntityManager

  /**
   * 根据角色id查询角色权限
   * @param roleIds 角色id数组
   * @returns 角色数组
   */
  async findRolePermissionsByRoleId(roleIds: string[]) {
    const RoleList = await this.manager.find(Role, {
      where: {
        id: In(roleIds),
      },
      relations: ["permissions"],
    })
    const per: Permission[] = []
    RoleList.forEach((item) => per.push(...item.permissions))
    return [...new Set(per.map((item) => item.iden))]
  }
}
