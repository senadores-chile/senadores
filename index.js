var base = require('senadores-base')

module.exports = function senadores (opts, type) {
  type = type || 'default'

  if (typeof opts === 'string' || typeof opts === 'number') {
    var senadorID = opts

    return new Promise((resolve, reject) => {
      var result = base(senadorID)
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
