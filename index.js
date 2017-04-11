var detalle = require('senadores-detalle')

module.exports = function senadores (opts, type) {
  type = type || 'default'

  if (typeof opts === 'string' || typeof opts === 'number') {
    var senadorID = opts
    if (type === 'default') {
      return detalle(senadorID)
    }
  }
}
