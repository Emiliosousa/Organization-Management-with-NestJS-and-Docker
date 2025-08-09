import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FindDocumentDto {
  @IsNumber()
  @IsOptional()
  creatorId?: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  newerThan?: Date;

  @IsDate()
  @IsOptional()
  olderThan?: Date;
}
