import { IsString, IsNumber, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 16' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'The first iPhone designed with Apple Inteligence in mind' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 49.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'https://media.es.wired.com/photos/66df80e2e44cf3a4d6515a67/16:9/w_2096,h_1179,c_limit/Screenshot%202024-09-09%20at%2010.42.09%E2%80%AFAM.png' })
  @IsUrl()
  imgUrl: string;

  @ApiProperty({ example: '9a40b2c7-712b-4e27-b8e2-3c885aeecf10', description: 'ID de la categoría' })
  category: string;
}