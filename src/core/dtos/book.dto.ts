import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  authorIds: number[];
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
