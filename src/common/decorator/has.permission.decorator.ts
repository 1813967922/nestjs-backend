import { SetMetadata } from '@nestjs/common';
import { DecoratorConstant } from '../constant/decorator.constant';

export const hasPermission = (...per: string[]) =>
  SetMetadata(DecoratorConstant.HASPERMISSIONS, per);
