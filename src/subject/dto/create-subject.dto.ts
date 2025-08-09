import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator';
import { Role } from '../../role/entities/role.entity';

export class CreateSubjectDto {
  @IsString()
  username: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsArray()
  roles: Role[];

  @IsString()
  publicKey: string;

  @IsString()
  password: string;
}
