import test from 'ava'
import senadores from './'

test('senadores options', t => {
  t.plan(3)
  const allamand = {
    id: 905,
    nombre: 'Allamand Zavala, Andrés',
    rut: '5002921-2',
    region: 'Región Metropolitana ',
    circunscripcion: 7,
    telefono: '(56-32) 2504701',
    mail: 'allamand@senado.cl',
    partido: 'R.N.'
  }
  const allende = {
    id: 985,
    nombre: 'Allende Bussi, Isabel',
    rut: '4465782-1',
    region: 'Región de Atacama',
    circunscripcion: 3,
    telefono: '(56-32) 2504671',
    mail: 'iallende@senado.cl',
    partido: 'P.S.'
  }
  const girardi = {
    id: 909,
    nombre: 'Girardi Lavín, Guido',
    rut: '8462985-5',
    region: 'Región Metropolitana ',
    circunscripcion: 7,
    telefono: '(56-32) 2504570',
    mail: 'ggirardi@senado.cl',
    partido: 'P.P.D.'
  }
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
    // region
    // nombre
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
