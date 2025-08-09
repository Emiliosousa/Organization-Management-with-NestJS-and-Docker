import { IsEmail, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  organizationName: string;
  @IsString()
  username: string;
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  publicKey: string;
}
