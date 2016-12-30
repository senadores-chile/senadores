import test from 'ava'
import {
  allamand,
  allende,
  girardi,
  socialistas,
  metropolitanos,
  circunscripcion3,
  asistenciaLagos,
  eleccionesAllamand,
  viajesZaldivar
} from './fixtures'
import senadores from './'

test('senadores options', t => {
  t.plan(3)
  // option as string
  const optString = senadores('Allamand')
  t.deepEqual(optString, allamand)
  // option as number
  const optNumber = senadores(5002921)
  t.deepEqual(optNumber, allamand)
  // option as array
  const optArray = senadores(['Allamand', 8462985, 'Allende'])
  t.deepEqual(optArray, [allamand, girardi, allende])
  // option as object
    // partido
    const optPartido = senadores({ partido: 'ps' })
    t.deepEqual(optPartido, socialistas)
    // region
    const optRegion = senadores({ region: 'Metropolitana' })
    t.deepEqual(optRegion, metropolitanos)
    // nombre
    const optNombre = senadores({ nombre: 'Guido' })
    t.deepEqual(optNombre, girardi)
    // rut
    // circunscripcion
    // telefono
    // email
    // cantidadSenadores
    // asistenciaSala
    // periodoAsistenciaSala
    // periodoAsistenciaComisiones
    // ingresosElecciones
    // gastosElecciones
    // periodoViajesNacionales
    // periodoViajesInternacionales
})

test('senadores types', t => {
  t.plan(1)

  // default
  // detalle
  // asistencia
  // asistencia sala
  // asistencia comisiones
  // viajes
  // viajes nacionales
  // viajes internacionales
  // elecciones
  // elecciones ingresos
  // elecciones gastos
  // todos
  t.pass()
})
