# senadores [![Build Status](https://img.shields.io/travis/YerkoPalma/senadores/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/senadores) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

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

### `senadores([query,] cb)`

La libreria consiste en una única función que ejecuta queries. El query de entrada puede ser un `string` (busca por nombre), un `number` (busca por rut) o un `object` (busca por query) con variadas opciones.
Si no se ingresa un query, por defecto busca el resumen de todos los senadores. El único parametro obligatorio es el callback que recibe como entrada el resultado de la busqueda

#### `query`

Es un objecto que tiene los mismos parametros que el objeto senadores, para la mayoria de los valores buscara coincidencias exactas (usando `assert.equal` y `assert.deepEqual`), a menos que se especifique otra condición usando expresiones regulares para los strings u operadores logicos para los numeros.

#### `cb`

Callback que recibe como entrada un arreglo con los posibles objetos que retorna la query de busqueda ingresada. En caso de no tener resultados, recibe un arreglo vacio.

### Objetos

La función retorna un arreglo de objetos, que pueden tener alguna de las siguientes estructuras:

#### senadores

```javascript
senadores(s => console.log(s))
senadores({}, s => console.log(s))
```

```javascript
[{
  nombre: 'Zaldívar Larraín, Andrés',
  region: 'Región del Maule',
  circunscripcion: 10,
  telefono: '(56-32) 2504691',
  mail: 'azaldivar@senado.cl',
  partido: 'P.D.C.'
},{
  ...
}]
```

#### senador

```javascript
senadores('Zaldivar', s => console.log(s))
senadores(10191543, s => console.log(s))
```

```javascript
{
  nombre: 'Zaldívar Larraín, Andrés',
  region: 'Región del Maule',
  circunscripcion: 10,
  telefono: '(56-32) 2504691',
  mail: 'azaldivar@senado.cl',
  partido: 'P.D.C.',
  representacion: {
    superficie: {
      cantidad: 2135443,
      medida: 'km2'
    },
    habitantes: 123135,
    distritos: [321,321,354,8,2,897,9,8],
    circunscripcion: 10,
    comunas: ['sad'. 'asd', 'wer']
  },
  comisiones: [{
    nombre: 'de educacion',
    tipo: 'permanente',
    fecha: 321354,
    calidad: 'permanente'
  }, {
    // ...
  }]
}
```
#### asistencia

```javascript
// TODO
```

#### votaciones

```javascript
// TODO
```

## License

[MIT](/license)

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
