import { Permission } from "../../permission/entities/permission.entity"
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity({ name: "t_role" })
export class Role {
  @PrimaryGeneratedColumn("uuid", { comment: "ID主键" })
  id: string

  @Column({ length: 16, comment: "角色名称" })
  rolename: string

  @Column({ unique: true,length: 16, comment: "角色标识" })
  iden: string

  @Column({ length: 32, comment: "角色描述",nullable: true})
  desc: string

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "t_role_permission", // 中间表名称
  })
  permissions: Permission[]
}
