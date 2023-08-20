import { Role } from "../../role/entities/role.entity"
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity({ name: "t_user" })
export class User {
  @PrimaryGeneratedColumn("uuid", { comment: "ID主键" })
  id: string

  @Column({ unique: true, length: 16, comment: "用户名" })
  username: string

  @Column({ length: 32, comment: "密码" })
  password: string

  @Column({ length: 16, comment: "昵称", nullable: true })
  nickName: string

  @Column({
    type: "tinyint",
    comment: "状态 0: 正常, 1: 禁用, 2:删除",
    default: 0,
  })
  status: number

  @CreateDateColumn({
    name: "create_at",
    type: "datetime",
    comment: "创建时间",
  })
  createAt: Date

  @UpdateDateColumn({
    name: "update_at",
    type: "datetime",
    comment: "更新时间",
  })
  updateAt: Date

  @ManyToMany(() => Role)
  @JoinTable({
    name: "t_user_role", // 中间表名称
  })
  roles: Role[]
}
