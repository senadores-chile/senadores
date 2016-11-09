# senadores [![Build Status](https://secure.travis-ci.org/YerkoPalma/senadores.svg?branch=master)](https://travis-ci.org/YerkoPalma/senadores) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> Datos publicos disponibles en la pagina www.senado.cl

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
senadores({ q: {
    partido: 'udi',
    region: 'metropolitana',
    asistencia: '<.8'
  }
}) // busca todos los senadores del partido udi, distrito región metropolitana con asistencia menor a 80%
```

## API

### `senadores([opts])`

La libreria consiste en una unica función que ejecuta queries. El parametro de entrada puede ser un `string` (busca por nombre), un `number` (busca por rut) o un `object` (busca por query) con variadas opciones.

#### `opts`

Las opciones disponibles son:

- `q`: Corresponde a la query de busqueda. Es un objecto que tiene los mismos parametros que el objeto senadores, para la mayoria de los valores buscara coincidencias exactas (usando `assert.equal` y `assert.deepEqual`), a menos que se especifique otra condición usando expresiones regulares para los strings u operadores logicos para los numeros.
- `limit`: Número máximo de ocurrencias.
- `orderBy`: Establece un criterio de orden. Corresponde a un string con el nombre de alguna propiedad del objeto senadores.
- `one`: Indica que se retorne sólo un resultado. Boolean.

### senadores (objeto)

La función retorna un arreglo de objetos, que tienen la siguiente estructura:

```json
{
  "nombre" : String,
  "rut" : Integer,
  "region" : String,
  "circunscripcion" : Integer,
  "telefono" : String,
  "mail" : String,
  "partido": {
    "nombre" : String,
    "siglas" : String,
    "codigo" : Integer
  },
  "asistencia" : Integer,
  "comisiones" : [
    {
      "nombre" : String,
      "tipo" : String,
      "fecha" : Date
    }
  ],
  "votos" : [
    {
      "fecha" : String,
      "tema" : String,
      "voto" : String,
      "partido" : String
    }
  ],
  "sueldo" : Integer
}
```

## License

[MIT](/license)

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
