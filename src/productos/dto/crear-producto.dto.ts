import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearProductoDto {
  @ApiProperty({ example: 'Audífonos' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 25.0 })
  @IsNumber()
  @IsPositive()
  precio: number;
}
