import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPrecioDto {
  @ApiProperty({ example: 60.0 })
  @IsNumber()
  @IsPositive()
  precio: number;
}
