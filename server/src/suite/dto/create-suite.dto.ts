import { Case } from 'case/schemas/case.schema';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateSuiteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  cases: Case[];

  @IsOptional()
  @IsBoolean()
  isArchive: boolean;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
