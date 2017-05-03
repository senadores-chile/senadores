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
    if (opts.asistenciaSala && typeof opts.asistenciaSala === 'string') {
      asistencia(opts, { tipo: 'sala' }).then(asistencias => {
        var total = asistencias[0].sala.asistencia + asistencias[0].sala.inasistencias.total
        var filter = parseCondition(opts.asistenciaSala, 'sala.asistencia', total)
        return Promise.resolve(asistencias.filter(filter))
      })
    }
    return asistencia(opts, { tipo: 'sala' })
  } else if (type === 'asistencia.comision' || type === 'asistencia.comisiones') {
    return opts.periodoAsistenciaComisiones
            ? asistencia(opts, { tipo: 'comision', periodo: opts.periodoAsistenciaComisiones })
            : asistencia(opts, { tipo: 'comision' })
  } else if (type === 'viajes') {
    // por ahora se muestran solo viajes al extranjero
    return opts.periodoViajesInternacionales
            ? viajes(opts, { tipo: 'extranjeros', periodo: opts.periodoViajesInternacionales })
            : viajes(opts, { tipo: 'extranjeros' })
  } else if (type === 'viajes.internacionales') {
    return opts.periodoViajesInternacionales
            ? viajes(opts, { tipo: 'extranjeros', periodo: opts.periodoViajesInternacionales })
            : viajes(opts, { tipo: 'extranjeros' })
  } else if (type === 'elecciones') {
    return eleccionesP(opts, { tipo: 'elecciones' })
  } else if (type === 'elecciones.gastos') {
    return eleccionesP(opts, { tipo: 'gastos' })
  } else if (type === 'elecciones.ingresos') {
    return eleccionesP(opts, { tipo: 'ingresos' })
  }
}

function parseCondition (condition, property, total) {
  // get operator
  var regex = /([<|>|=]{1,2})((?:\.\d+)|(?:\d+\.\d*)|(?:\d*))(%)?/ // /([<|>|=]{1,2})(\.?)(\d*)(%)?/
  var arr = regex.exec(condition)
  var operator = arr[1]
  var value = parseFloat(arr[3])
  var isPercentage = arr[4] === '%'
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
      value = value[property]
    })
    return value
  }
}
