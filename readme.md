# senadores [![npm version](https://img.shields.io/npm/v/senadores.svg?style=flat-square)](https://www.npmjs.com/package/senadores) [![Build Status](https://img.shields.io/travis/YerkoPalma/senadores/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/senadores) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> WIP - Datos públicos disponibles en la página www.senado.cl

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
  asistencia: '<.85'
}, 'asistencia.sala') // busca todos los senadores del partido udi, distrito región metropolitana con asistencia menor a 85%
```

## API

### `senadores([options][, type])`

Existe una unica función expuesta, que recibe argumentos variables y opcionales como entrada. Si la operación es exitosa, la función resuelve en una promesa con un arreglo conteniendo la información solicitada, en caso de existir un error, la función arroja un `Error` con un mensaje especificando la falla.

#### `options<string | number | array | object>`

El primer argumento de la función puede ser de tipo `string`, `number`, `array` u `object`. Si se trata de un `string` o `number` buscara **solo un** senador por nombre o rut/id respectivamente.
Si se trata de un `array`, se espera un arreglo de strings y/o numbers, donde se obtendra para cada uno, la información de un senador. En caso de tratarse de un objeto, se espera una serie de opciones para afinar la busqueda.
El resultado obtenido al final, dependerá de la variable `type` ingresada, por defecto, busca información básica de cada senador (más información en [type](#type)). Para el objeto, las propiedades de busqueda posibles son:

- `partido<string>`: Siglas del partido politico.
- `region<string>`: Nombre de la región (no sirve el número de región).
- `nombre<string>`: Nombre del/la senador/a.
- `rut<number>`: Rut a encontrar.
- `circunscripcion<number>`: Número de la circunscripción.
- `telefono<string>`: Télefono (de oficina) del senador.
- `email<string>`: Email administrativo del senador.
- `cantidadSenadores<number>`: Indica la cantidad máxima de senadores a consultar.
- `asistenciaSala<string>`: String de busqueda de asistencia de sala. Si se trata de un número, busca asistencia exacta en porcentaje, también se puede ingresar un comparador lógico para buscar, ej: `'>90%'`. _Solo será considerado si el tipo de busqueda es `'asistencia.sala'`_.
- `periodoAsistenciaSala<number | date>`: Periodo para buscar asistencia, para más información, consultar la API de [asistencia senadores](https://github.com/YerkoPalma/senadores-asistencia#asistenciaquery--options). _Solo será considerado si el tipo de busqueda es `'asistencia.sala'`_.
- `periodoAsistenciaComisiones<number | date>`: Periodo para buscar asistencia, para más información, consultar la API de [asistencia senadores](https://github.com/YerkoPalma/senadores-asistencia#asistenciaquery--options). _Solo será considerado si el tipo de busqueda es `'asistencia.comisiones'`_. 
- `ingresosElecciones<string>`: String de busqueda de información de elecciones. Si se trata de un número, busca el ingreso más próximo, también se puede ingresar un comparador lógico para buscar, ej: `'>90000000'`. _Solo será considerado si el tipo de busqueda es `elecciones` o `'elecciones.ingresos'`_.
- `gastosElecciones<string>`: String de busqueda de información de elecciones. Si se trata de un número, busca el gasto más próximo, también se puede ingresar un comparador lógico para buscar, ej: `'>90000000'`. _Solo será considerado si el tipo de busqueda es `elecciones` o `'elecciones.gastos'`_.
- `periodoViajesNacionales<number | date>`: Periodo para buscar viajes nacionales, para más información, consultar la API de [viajes senadores](https://github.com/YerkoPalma/senadores-viajes). _Solo será considerado si el tipo de busqueda es `'viajes'` o `'viajes.nacionales'`_.
- `periodoViajesInternacionales<number | date>`: Periodo para buscar viajes internacionales, para más información, consultar la API de [viajes senadores](https://github.com/YerkoPalma/senadores-viajes). _Solo será considerado si el tipo de busqueda es `'viajes'` o `'viajes.internacionales'`_.

#### `type<string>`

Indicador del tipo de consulta que se esta realizando. Puede tener los siguientes valores:

- `'default'`: Obtiene detalle de los senadores.
- `'asistencia'`: Obtiene asistencia de sala y comisiones de los senadores.
- `'asistencia.sala'`: Obtiene asistencia de sala de los senadores.
- `'asistencia.comisiones'`: Obtiene asistencia de comisiones de los senadores.
- `'viajes'`: Obtiene información de viajes nacionales e internacionales de senadores.
- `'viajes.nacionales'`: Obtiene información de viajes nacionales de senadores.
- `'viajes.internacionales'`: Obtiene información de viajes internacionales de senadores.
- `'elecciones'`: Obtiene información de ingresos y gastos durante periodo de elecciones de cada senador.
- `'elecciones.ingresos'`: Obtiene información de ingresos durante periodo de elecciones de cada senador.
- `'elecciones.gastos'`: Obtiene información de gastos durante periodo de elecciones de cada senador.
- `'todos'`: Obtiene la información equivalente de todo el resto de los modos. _CUIDADO: Proceso lento_.

## Otros enlaces

- [senadores-base](https://github.com/YerkoPalma/senadores-base) - Información basica y estatica de los senadores actuales de Chile.
- [senadores-asistencia](https://github.com/YerkoPalma/senadores-asistencia) - Observador de la asistencia de senadores tanto a sesiones de sala como a comisiones del senado de Chile.
- [senadores-detalle](https://github.com/YerkoPalma/senadores-detalle) - Detalle complementario a la información base de cada senador.
- [senadores-viajes](https://github.com/YerkoPalma/senadores-viajes) - Obtiene el detalle de los viajes realizados por senadores de Chile.
- [senadores-elecciones](https://github.com/YerkoPalma/senadores-elecciones) - Contiene la información de las ultimas elecciones de senadores, obtenidas desde el Servel.

## Licencia

[MIT](/license) © [Yerko Palma](https://github.com/YerkoPalma).
