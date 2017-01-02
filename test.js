import test from 'ava'
import {
  allamand,
  allende,
  girardi,
  socialistas,
  metropolitanos,
  circunscripcion3,
  asistenciaLagos,
  asistencia88,
  eleccionesSobre300M,
  viajesZaldivar
} from './fixtures'
import senadores from './'

test('senadores options', async t => {
  t.plan(18)
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
    const optRut = senadores({ rut: 8462985 })
    t.deepEqual(optRut, girardi)
    // circunscripcion
    const optCircunscripcion = senadores({ circunscripcion: 3 })
    t.deepEqual(optCircunscripcion, circunscripcion3)
    // telefono
    const optTelefono = senadores({ telefono: '2504671' })
    t.deepEqual(optTelefono, allende)
    // email
    const optEmail = senadores({ email: 'iallende@senado.cl'})
    t.deepEqual(optEmail, allende)
    // cantidadSenadores
    const optCantidadSenadores = senadores({ cantidadSenadores: 4 })
    t.is(optCantidadSenadores.length, 4)
    // asistenciaSala
    const optAsistenciaSala = await senadores({ asistenciaSala: '<88%' }, 'asistencia.sala')
    t.deepEqual(optAsistenciaSala.sala, asistencia88)
    // periodoAsistenciaSala
    const optPeriodoAsistenciaSala = await senadores({ periodoAsistenciaSala: 2015 }, 'asistencia.sala')
    t.deepEqual(optPeriodoAsistenciaSala, asistenciaLagos.sala)
    // periodoAsistenciaComisiones
    const optPeriodoAsistenciaComisiones = await senadores({ periodoAsistenciaComisiones: 2015 }, 'asistencia.comisiones')
    t.deepEqual(optPeriodoAsistenciaComisiones, asistenciaLagos.comisiones)
    // ingresosElecciones
    const optIngresoElecciones = await senadores({ ingresosElecciones: '>300000000' }, 'elecciones.ingresos')
    t.deepEqual(optIngresoElecciones, eleccionesSobre300M.ingresos)
    // gastosElecciones
    const optGastosElecciones = await senadores({ gastosElecciones: '>300000000' }, 'elecciones.gastos')
    t.deepEqual(optGastosElecciones, eleccionesSobre300M.gastos)
    // periodoViajesNacionales
    const optPeriodoViajesNacionales = await senadores({ periodoViajesNacionales: 2016, nombre: 'Zaldivar' }, 'viajes.nacionales')
    t.deepEqual(optPeriodoViajesNacionales, viajesZaldivar.nacionales)
    // periodoViajesInternacionales
    const optPeriodoViajesInternacionales = await senadores({ periodoViajesInternacionales: 2016, nombre: 'Zaldivar' }, 'viajes.internacionales')
    t.deepEqual(optPeriodoViajesInternacionales, viajesZaldivar.internacionales)
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
