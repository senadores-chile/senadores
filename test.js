const test = require('blue-tape')
const detalleAllende = require('./fixtures').detalleAllende
const detalleAllamand = require('./fixtures').detalleAllamand
const asistenciaLagos = require('./fixtures').asistenciaLagos
const viajesMoreira = require('./fixtures').viajesMoreira
const eleccionesAllamand = require('./fixtures').eleccionesAllamand
const detalleSocialistas = require('./fixtures').socialistas
const detalleMetropolitanos = require('./fixtures').metropolitanos
const detalleCircunscripcion3 = require('./fixtures').circunscripcion3

const senadores = require('./')

// typeof opts === 'string'

test('default string search', t => {
  return senadores('Allende').then(senador => {
    t.deepEqual(senador[0], detalleAllende)
  })
})
test('default string search, type defined', t => {
  return senadores('Allende', 'default').then(senador => {
    t.deepEqual(senador[0], detalleAllende)
  })
})
test('default string search, not found', t => {
  return t.shouldFail(senadores('Fake'), Error)
})

// typeof opts === 'number'

test('default number search', t => {
  return senadores(4465782).then(senador => {
    t.deepEqual(senador[0], detalleAllende)
  })
})
test('default number search, type defined', t => {
  return senadores(4465782, 'default').then(senador => {
    t.deepEqual(senador[0], detalleAllende)
  })
})
test('default number search, not found', t => {
  return t.shouldFail(senadores(112233), Error)
})

// array
test('default array search', t => {
  return senadores(['Allamand', 4465782]).then(senadores => {
    t.deepEqual(senadores, [detalleAllamand, detalleAllende])
  })
})
test.skip('asistencia', t => {
  return senadores('Lagos', 'asistencia').then(senador => {
    t.deepEqual(senador[0], asistenciaLagos)
  })
})
test.skip('asistencia sala', t => {
  return senadores('Lagos', 'asistencia.sala').then(senador => {
    t.deepEqual(senador[0], asistenciaLagos.sala)
  })
})
test.skip('asistencia comisiones', t => {
  return senadores('Lagos', 'asistencia.comisiones').then(senador => {
    t.deepEqual(senador[0], asistenciaLagos.comisiones)
  })
})
// viajes
test('viajes', t => {
  return senadores('Moreira', 'viajes.internacionales').then(viajes => {
    t.deepEqual(viajes[0], viajesMoreira.internacionales)
  })
})
// elecciones
test('elecciones', t => {
  return senadores('Allamand', 'elecciones').then(elecciones => {
    t.deepEqual(elecciones[0], eleccionesAllamand.elecciones)
  })
})
test('elecciones.ingresos', t => {
  return senadores('Allamand', 'elecciones.ingresos').then(elecciones => {
    t.deepEqual(elecciones[0], eleccionesAllamand.elecciones.ingresos)
  })
})
test('elecciones.gastos', t => {
  return senadores('Allamand', 'elecciones.gastos').then(elecciones => {
    t.deepEqual(elecciones[0], eleccionesAllamand.elecciones.gastos)
  })
})
// options
test('options partido', t => {
  return senadores({ partido: 'PS' }).then(socialistas => {
    t.deepEqual(socialistas, detalleSocialistas)
  })
})
test('options region', t => {
  return senadores({ region: 'Metropolitana' }).then(metropolitanos => {
    t.deepEqual(metropolitanos, detalleMetropolitanos)
  })
})
test('options circunscripcion', t => {
  return senadores({ circunscripcion: 3 }).then(circunscripcion3 => {
    t.deepEqual(circunscripcion3, detalleCircunscripcion3)
  })
})
test('options ingresosElecciones', t => {
  return senadores({ ingresosElecciones: '>500000000' }, 'elecciones.ingresos').then(ingresos => {
    t.equal(ingresos.length, 3)
  })
})
test('options gastosElecciones', t => {
  return senadores({ gastosElecciones: '>500000000' }, 'elecciones.gastos').then(gastos => {
    t.equal(gastos.length, 3)
  })
})
test('options asistenciaSala', t => {
  return senadores({ partido: 'PS', asistenciaSala: '<.99' }, 'asistencia.sala').then(asistencias => {
    t.equal(asistencias.length, 3)
  })
})
