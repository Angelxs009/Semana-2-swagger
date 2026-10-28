import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ajv = new Ajv.default({ allErrors: true });
addFormats.default(ajv);

@Injectable()
export class JsonSchemaValidationPipe implements PipeTransform {
  private readonly validate;

  constructor(schema: object) {
    this.validate = ajv.compile(schema);
  }

  transform(value: any) {
    if (!this.validate(value)) {
      throw new BadRequestException({
        mensaje: 'El cuerpo de la peticion no cumple el contrato JSON Schema',
        errores: this.validate.errors,
      });
    }
    return value;
  }
}
