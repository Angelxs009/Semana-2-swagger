import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductosService, type Producto } from './productos.service.js';
import { CrearProductoDto } from './dto/crear-producto.dto.js';
import { ActualizarPrecioDto } from './dto/actualizar-precio.dto.js';

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
    description: 'Producto encontrado, con enlaces HATEOAS.',
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    const producto = this.productosService.findOne(id);
    return {
      ...producto,
      _links: {
        self: { href: `/api/v1/productos/${producto.id}` },
        actualizar: { href: `/api/v1/productos/${producto.id}`, method: 'PUT' },
        eliminar: { href: `/api/v1/productos/${producto.id}`, method: 'DELETE' },
      },
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado, con header Location.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  crear(@Body() dto: CrearProductoDto, @Res({ passthrough: true }) res: Response) {
    const nuevo = this.productosService.crear(dto);
    res.setHeader('Location', `/api/v1/productos/${nuevo.id}`);
    return nuevo;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Reemplazar un producto completo' })
  @ApiResponse({ status: 204, description: 'Producto reemplazado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  reemplazar(@Param('id', ParseIntPipe) id: number, @Body() dto: CrearProductoDto) {
    this.productosService.reemplazar(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente el precio de un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  actualizarPrecio(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarPrecioDto) {
    return this.productosService.actualizarPrecio(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    this.productosService.eliminar(id);
  }
}
