import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly manager: EntityManager;

  async findUserRolesById(id:string) {
    return (await this.manager.findOne(User,{where:{id},relations:['roles']})).roles;

  }


  async findUserById(id: string) {
    return await this.manager.findOne(User, {
      where: {
        id,
      },
    });
  }

  async loadByUserName(username: string) {
    const userExist = await this.manager.findOne(User, {
      where: { username },
    });
    if (!userExist) {
      throw new UnauthorizedException('账号密码错误');
    }
    return userExist;
  }
}
