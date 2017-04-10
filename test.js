const test = require('blue-tape')
const allamand = require('./fixtures').allamand
const allende = require('./fixtures').allende
const detalleAllende = require('./fixtures').detalleAllende

const senadores = require('./')

// typeof opts === 'string'

test('default string search', t => {
  return senadores('Allamand').then(senador => {
    t.deepEqual(senador, allamand)
  })
})
test('default string search, type defined', t => {
  return senadores('Allamand', 'default').then(senador => {
    t.deepEqual(senador, allamand)
  })
})
test('default string search, not found', t => {
  return t.shouldFail(senadores('Fake'), Error)
})
test('detail string search', t => {
  return senadores('Allende', 'detalle').then(senador => {
    t.deepEqual(senador[0], detalleAllende)
  })
})

// typeof opts === 'number'

test('default number search', t => {
  return senadores(4465782).then(senador => {
    t.deepEqual(senador, allende)
  })
})
test('default number search, type defined', t => {
  return senadores(4465782, 'default').then(senador => {
    t.deepEqual(senador, allende)
  })
})
test('default number search, not found', t => {
  return t.shouldFail(senadores(112233), Error)
})
