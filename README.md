# 基于 Nest 实现 RBAC0 的一个权限管理系统

集成 TypeOrm、JWT、Redis、Winston 日志系统、多环境配置

## 安装

把根目录的 nestjs SQL文件导入数据库

修改 /src/config/*.yml 配置文件、配置数据库、Redis

```sh
# 安装依赖
pnpm install 
启动项目
pnpm start:dev
```

## 依赖

参数效验

- "class-transformer": "^0.5.1"
- "class-validator": "^0.14.0"

高速缓存
- "ioredis": "^5.3.2"

配置效验
- "joi": "^17.9.2"
- "js-yaml": "^4.1.0"

数据库
- "mysql2": "^3.6.0"
- "typeorm": "^0.3.17"

日志系统
- "nest-winston": "^1.9.3"
- "winston": "^3.10.0"
- "winston-daily-rotate-file": "^4.7.1"
