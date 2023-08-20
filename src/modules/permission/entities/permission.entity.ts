import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "t_permission" })
export class Permission {
  @PrimaryGeneratedColumn("uuid", { comment: "ID主键" })
  id: string

  @Column({ name: "permission_name", length: 16, comment: "权限名称" })
  permissionName: string

  @Column({unique: true, length: 16, comment: "权限标识" })
  iden: string
  
  @Column({ length: 32, comment: "权限描述" })
  desc: string
}
