# senadores [![npm version](https://img.shields.io/npm/v/senadores.svg?style=flat-square)](https://www.npmjs.com/package/senadores) [![Build Status](https://img.shields.io/travis/YerkoPalma/senadores/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/senadores) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> Datos públicos disponibles en la página www.senado.cl

## Instalación

```bash
npm install --save senadores
```

## Uso

```javascript
var senadores = require('senadores')

senadores() // lista completa de senadores
senadores('Guirardi') // busca por nombre
senadores(1232156) // busca por rut
senadores({
  partido: 'udi',
  region: 'metropolitana',
  asistencia: '<.8'
}) // busca todos los senadores del partido udi, distrito región metropolitana con asistencia menor a 80%
```

## API

### `senadores([options][, type])`

#### `options`

#### `type`

## Otros enlaces

- [senadores-base](https://github.com/YerkoPalma/senadores-base) - Información basica y estatica de los senadores actuales de Chile.
- [senadores-asistencia](https://github.com/YerkoPalma/senadores-asistencia) - Observador de la asistencia de senadores tanto a sesiones de sala como a comisiones del senado de Chile.
- [senadores-detalle](https://github.com/YerkoPalma/senadores-detalle) - Detalle complementario a la información base de cada senador.
- [senadores-viajes](https://github.com/YerkoPalma/senadores-viajes) - Obtiene el detalle de los viajes realizados por senadores de Chile.
- [senadores-elecciones](https://github.com/YerkoPalma/senadores-elecciones) - Contiene la información de las ultimas elecciones de senadores, obtenidas desde el Servel.

## Licencia

[MIT](/license) © [Yerko Palma](https://github.com/YerkoPalma).