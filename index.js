var base = require('senadores-base')
var detalle = require('senadores-detalle')

module.exports = function senadores (opts, type) {
  type = type || 'default'

  if (typeof opts === 'string' || typeof opts === 'number') {
    var senadorID = opts
    if (type === 'detalle') {
      return detalle(senadorID)
    }
    var result = base(senadorID)

    return new Promise((resolve, reject) => {
      if (result.length === 1) result = result[0]
      if (result) {
        if (Array.isArray(result) && result.length <= 0) {
          reject(new Error('No se encontro el senador ' + senadorID))
        } else {
          resolve(result)
        }
      } else {
        reject(new Error('No se encontro el senador ' + senadorID))
      }
    })
  }
}
