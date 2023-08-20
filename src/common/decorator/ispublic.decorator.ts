import { SetMetadata } from '@nestjs/common';
import { DecoratorConstant } from "../constant/decorator.constant";

export const IsPublic = () => SetMetadata(DecoratorConstant.ISPUBLIC, true);
