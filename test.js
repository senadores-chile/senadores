const test = require('blue-tape')

const senadores = require('./')

test('default string search', t => {
  return senadores('Allamand').then(senador => {
    t.deepEqual(senador, {
      id: 905,
      nombre: 'Allamand Zavala, Andrés',
      rut: '5002921-2',
      region: 'Región Metropolitana ',
      circunscripcion: 7,
      telefono: '(56-32) 2504701',
      mail: 'allamand@senado.cl',
      partido: 'R.N.'
    })
  })
})

