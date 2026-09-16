import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductosService, type Producto } from './productos.service.js';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar productos disponibles' })
  @ApiOkResponse({
    description: 'Lista de productos.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          nombre: { type: 'string', example: 'Teclado mecánico' },
          precio: { type: 'number', example: 45.9 },
        },
      },
    },
  })
  findAll(): Producto[] {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por id' })
  @ApiOkResponse({
    description: 'Producto encontrado.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        nombre: { type: 'string', example: 'Teclado mecánico' },
        precio: { type: 'number', example: 45.9 },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'El id no es un número válido.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Producto {
    return this.productosService.findOne(id);
  }
}
