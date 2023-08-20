import { Module } from "@nestjs/common"
import { UserModule } from "./modules/user/user.module"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthModule } from "./modules/auth/auth.module"
import { RoleModule } from "./modules/role/role.module"
import { PermissionModule } from "./modules/permission/permission.module"
import configuration from "./env/index"
import * as Joi from "joi"
import { AppController } from "./app.controller"
import { APP_GUARD } from "@nestjs/core"
import { AuthGuard } from "./common/guard/auth.guard"
import { PermissionGuard } from "./common/guard/permission.guard"
import { CacheModule } from "./modules/cache/cache.module"
import { JwtModule, JwtModuleAsyncOptions } from "@nestjs/jwt"
import { LogsModule } from "./modules/logs/logs.module"
import { RoleGuard } from "./common/guard/role.guard"

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test")
          .default("development"),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        // 控制是否允许环境变量中未知的键 默认为true
        allowUnknown: true,
        // 在遇到第一个错误时就停止验证,如果为false就返回所有错误，默认为false
        abortEarly: true,
      },
    }),
    // Jwt
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return { ...config.get("jwt") } as JwtModuleAsyncOptions
      },
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return { ...config.get("db") } as TypeOrmModuleOptions
      },
    }),
    // Redis
    CacheModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
