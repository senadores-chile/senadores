const test = require('blue-tape')
const detalleAllende = require('./fixtures').detalleAllende

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
