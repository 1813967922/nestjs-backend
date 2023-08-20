import { INestApplication } from '@nestjs/common';
import { setupSwagger } from './swagger.config';

const plugins = [setupSwagger];

export const setupPlugins = (app: INestApplication) => {
  plugins.forEach((plugin) => plugin(app));
};
