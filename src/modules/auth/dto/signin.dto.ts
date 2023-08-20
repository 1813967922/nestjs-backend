import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninDto {
  @IsString({ message: '用户名必须是字符串'})
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(6, 16, { message: '用户名长度为6-16位' })
  @ApiProperty({ example: '张三', description: '用户名', required: true })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 16, { message: '密码长度为6-16位' })
  @ApiProperty({ example: '123456', description: '密码', required: true })
  password: string;
}
