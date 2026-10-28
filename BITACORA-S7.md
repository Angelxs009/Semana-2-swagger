# Bitácora · Semana 7 · Contratos y validación

## 1. ¿Cuál se sintió más "contrato explícito"?
El `.proto` de la Semana 3. Es el único donde el contrato es el artefacto principal: de él salen los tipos, los métodos y el streaming, y si cambia, el cliente lo nota al compilar. El JSON Schema es casi igual de explícito porque vive en un archivo `.json` independiente del código, pero hay que conectarlo a mano con un pipe. Con class-validator el contrato queda mezclado con la clase TypeScript.

## 2. ¿Cuándo class-validator y cuándo JSON Schema?
- **class-validator:** cuando solo hay una API NestJS/TypeScript, un único equipo y el DTO ya sirve como tipo y como documentación Swagger. Es más rápido de escribir.
- **JSON Schema:** cuando el contrato debe compartirse con otros lenguajes o equipos, versionarse como archivo, validarse en CI (como hicimos con `check-compatibility.js`) o consumirse desde otras herramientas (OpenAPI, brokers, gateways).

## 3. Con 5 consumidores externos: ¿BACKWARD o FULL?
FULL. Con BACKWARD solo garantizo que el esquema nuevo lee datos viejos; eso asume que actualizo primero a los consumidores. Con 5 consumidores externos no controlo cuándo actualizan, así que algunos seguirán con el esquema viejo mientras otros usan el nuevo. FULL (backward + forward) permite que cualquier versión conviva con cualquier otra. El costo es más restricción: solo agregar campos opcionales y eliminar campos opcionales.

### Declaración de uso de IA
- Herramienta(s): Claude Code (Claude Sonnet 5.5)
- Nivel de uso: 3 (la IA escribió y ejecutó la práctica)
- Qué se le pidió: realizar la práctica de la guía web-practica (Semana 7), incluidas las respuestas de cierre.
- Qué se modificó/verificó manualmente: la IA ejecutó el build, el script y las pruebas del pipe. Corrigió un error del script de la guía. Pendiente que el estudiante revise y comprenda cada paso.
