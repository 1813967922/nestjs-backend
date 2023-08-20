import { SetMetadata } from "@nestjs/common"
import { DecoratorConstant } from "../constant/decorator.constant"

export const hasRole = (...per: string[]) =>
  SetMetadata(DecoratorConstant.HASROLES, per)
