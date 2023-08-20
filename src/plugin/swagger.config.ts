import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ParameterObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { WebConstant } from 'src/common/constant/web.constant';

const globalParameters: Array<ParameterObject> = [
  { name: 'token', in: 'header' },
];

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('XX后台管理系统')
    .setDescription('XX后台管理系统接口文档')
    .setVersion('1.0.0')
    .setContact('ruabbw', '1813967922@qq.com', 'https://1813967922.github.com')
    .addBearerAuth({
      type: 'http',
      name: 'bearer',
      description:"bearer"
      })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
