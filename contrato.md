# Contrato CRUD de /api/v1/productos

Diseñado **antes** de escribir el controlador (mentalidad API-first).

| Operación | Verbo | URI | Éxito |
|---|---|---|---|
| Listar | GET | `/api/v1/productos` | 200 |
| Obtener uno | GET | `/api/v1/productos/{id}` | 200 / 404 |
| Crear | POST | `/api/v1/productos` | 201 + Location |
| Reemplazar | PUT | `/api/v1/productos/{id}` | 204 |
| Actualizar parcial | PATCH | `/api/v1/productos/{id}` | 200 |
| Eliminar | DELETE | `/api/v1/productos/{id}` | 204 / 404 |

## Notas de diseño

- `POST` y `PUT` validan el cuerpo con `CrearProductoDto` (`nombre` no vacío, `precio` positivo) vía `class-validator` + `ValidationPipe` global.
- `PATCH` usa `ActualizarPrecioDto` (solo `precio`), reflejando que es una actualización parcial.
- `PUT` es idempotente: reemplaza el recurso completo y no requiere devolver cuerpo (204).
- `DELETE` es idempotente en el sentido de resultado: repetirlo sobre el mismo id da 404, nunca 500.
- `GET /productos/{id}` incluye enlaces `_links` (HATEOAS) para `self`, `actualizar` y `eliminar`.
