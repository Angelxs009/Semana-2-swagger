# Mini-contrato: GET /productos

Diseñado **antes** de escribir el controlador (mentalidad API-first).

| Campo | Valor |
|---|---|
| Recurso | `/productos` |
| Verbo | GET |
| Respuesta 200 | Lista de `{ id, nombre, precio }` |
| Respuesta de error | 500 si falla el servidor |

## Mini-contrato: GET /productos/{id}

| Campo | Valor |
|---|---|
| Recurso | `/productos/{id}` |
| Verbo | GET |
| Parámetro | `id` (entero, en la ruta) |
| Respuesta 200 | `{ id, nombre, precio }` |
| Respuesta 400 | `id` no es un número válido (`ParseIntPipe`) |
| Respuesta 404 | No existe un producto con ese `id` |
