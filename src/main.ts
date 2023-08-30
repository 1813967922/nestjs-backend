import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { setupPlugins } from "./plugin"
import { ValidationPipe } from "@nestjs/common"
import { NestExpressApplication } from "@nestjs/platform-express"
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 注册自定义日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  // 配置顶级前缀
  app.setGlobalPrefix("api")
  // 注册全局管道
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  // 注册插件
  setupPlugins(app)
  // 启动
  await app.listen(3000)
  // 启动成功输出
  console.log("Application is running on: http://localhost:3000/")
  console.log("Application interface is running on: http://localhost:3000/api")
}
bootstrap()
