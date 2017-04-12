var detalle = require('senadores-detalle')
const asistencia = require('senadores-asistencia')

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
  }
}
