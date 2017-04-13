var detalle = require('senadores-detalle')
var asistencia = require('senadores-asistencia')
var viajes = require('senadores-viajes')
var elecciones = require('senadores-elecciones')
var eleccionesP = function () {
  var args = arguments
  var self = this
  return new Promise((resolve, reject) => {
    try {
      resolve(elecciones.apply(self, args))
    } catch (ex) {
      reject(ex)
    }
  })
}

module.exports = function senadores (opts, type) {
  type = type || 'default'

  if (type === 'default') {
    return detalle(opts)
  } else if (type === 'asistencia') {
    return asistencia(opts)
  } else if (type === 'asistencia.sala') {
    return asistencia(opts, { tipo: 'sala' })
  } else if (type === 'asistencia.comision' || type === 'asistencia.comisiones') {
    return opts.periodoAsistenciaComisiones
            ? asistencia(opts, { tipo: 'comision', periodo: opts.periodoAsistenciaComisiones })
            : asistencia(opts, { tipo: 'comision' })
  } else if (type === 'viajes') {
    // por ahora se muestran solo viajes al extranjero
    return viajes(opts, { tipo: 'extranjeros' })
  } else if (type === 'viajes.internacionales') {
    return viajes(opts, { tipo: 'extranjeros' })
  } else if (type === 'elecciones') {
    return eleccionesP(opts, { tipo: 'elecciones' })
  } else if (type === 'elecciones.gastos') {
    return eleccionesP(opts, { tipo: 'gastos' })
  } else if (type === 'elecciones.ingresos') {
    return eleccionesP(opts, { tipo: 'ingresos' })
  }
}
