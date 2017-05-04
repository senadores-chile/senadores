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
    return asistencia(opts, { incluyeSenador: !!opts.incluyeSenador })
  } else if (type === 'asistencia.sala') {
    if (opts.asistenciaSala && typeof opts.asistenciaSala === 'string') {
      return asistencia(opts, { tipo: 'sala', incluyeSenador: !!opts.incluyeSenador }).then(asistencias => {
        var total = asistencias[0].asistencia + asistencias[0].inasistencias.total
        var filter = parseCondition(opts.asistenciaSala, 'asistencia', total)
        var array = asistencias.filter(filter)
        return Promise.resolve(array)
      })
    }
    return asistencia(opts, { tipo: 'sala', incluyeSenador: !!opts.incluyeSenador })
  } else if (type === 'asistencia.comision' || type === 'asistencia.comisiones') {
    return opts.periodoAsistenciaComisiones
            ? asistencia(opts, { tipo: 'comision', periodo: opts.periodoAsistenciaComisiones, incluyeSenador: !!opts.incluyeSenador })
            : asistencia(opts, { tipo: 'comision', incluyeSenador: !!opts.incluyeSenador })
  } else if (type === 'viajes') {
    // por ahora se muestran solo viajes al extranjero
    return opts.periodoViajesInternacionales
            ? viajes(opts, { tipo: 'extranjeros', periodo: opts.periodoViajesInternacionales })
            : viajes(opts, { tipo: 'extranjeros' })
  } else if (type === 'viajes.internacionales') {
    return opts.periodoViajesInternacionales
            ? viajes(opts, { tipo: 'extranjeros', periodo: opts.periodoViajesInternacionales, incluyeSenador: !!opts.incluyeSenador })
            : viajes(opts, { tipo: 'extranjeros', incluyeSenador: !!opts.incluyeSenador })
  } else if (type === 'elecciones') {
    return eleccionesP(opts, { tipo: 'elecciones', incluyeSenador: !!opts.incluyeSenador })
  } else if (type === 'elecciones.gastos') {
    if (opts.gastosElecciones && typeof opts.gastosElecciones === 'string') {
      return eleccionesP(opts, { tipo: 'gastos', incluyeSenador: !!opts.incluyeSenador }).then(gastos => {
        var filter = parseCondition(opts.gastosElecciones, opts.incluyeSenador ? 'elecciones.gastos.total' : 'total')
        var array = gastos.filter(filter)
        return Promise.resolve(array)
      })
    }
    return eleccionesP(opts, { tipo: 'gastos', incluyeSenador: !!opts.incluyeSenador })
  } else if (type === 'elecciones.ingresos') {
    if (opts.ingresosElecciones && typeof opts.ingresosElecciones === 'string') {
      return eleccionesP(opts, { tipo: 'ingresos', incluyeSenador: !!opts.incluyeSenador }).then(ingresos => {
        var filter = parseCondition(opts.ingresosElecciones, opts.incluyeSenador ? 'elecciones.ingresos.total' : 'total')
        var array = ingresos.filter(filter)
        return Promise.resolve(array)
      })
    }
    return eleccionesP(opts, { tipo: 'ingresos', incluyeSenador: !!opts.incluyeSenador })
  }
}

function parseCondition (condition, property, total) {
  total = total || 1
  // get operator
  var regex = /([<|>|=]{1,2})((?:\.\d+)|(?:\d+\.\d*)|(?:\d*))(%)?/ // /([<|>|=]{1,2})(\.?)(\d*)(%)?/
  var arr = regex.exec(condition)
  var operator = arr[1]
  var value = parseFloat(arr[2])
  var isPercentage = arr[3] === '%'
  var isRatio = ((value >= 0) && (value <= 1))

  switch (operator) {
    case '<':
      return (item) => {
        var val = getProperty(item, property)
        if (val) {
          return isPercentage
                  ? val < (value * total) / 100
                  : isRatio
                    ? val < value * total
                    : val < value
        }
        return false
      }
    case '>':
      return (item) => {
        var val = getProperty(item, property)
        if (val) {
          return isPercentage
                  ? val > (value * total) / 100
                  : isRatio
                    ? val > value * total
                    : val > value
        }
        return false
      }
    case '<=':
      return (item) => {
        var val = getProperty(item, property)
        if (val) {
          return isPercentage
                  ? val <= (value * total) / 100
                  : isRatio
                    ? val <= value * total
                    : val <= value
        }
        return false
      }
    case '>=':
      return (item) => {
        var val = getProperty(item, property)
        if (val) {
          return isPercentage
                  ? val >= (value * total) / 100
                  : isRatio
                    ? val >= value * total
                    : val >= value
        }
        return false
      }
    case '=':
      return (item) => {
        var val = getProperty(item, property)
        if (val) {
          return isPercentage
                  ? val === (value * total) / 100
                  : isRatio
                    ? val === value * total
                    : val === value
        }
        return false
      }

    default:
      return () => false
  }
  function getProperty (item, prop) {
    var props = prop.split('.')
    var value = item
    props.forEach(property => {
      if (value) value = value[property]
    })
    return value
  }
}
