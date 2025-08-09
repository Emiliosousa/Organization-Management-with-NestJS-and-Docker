import { IsNumber, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  algorithm: string;

  @IsString()
  key: string;

  @IsNumber()
  roleId: number;
}
