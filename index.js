var base = require('senadores-base')

module.exports = function senadores (opts, type) {
  type = type || 'default'

  if (typeof opts === 'string') {
    var senatorName = opts

    return new Promise((resolve, reject) => {
      var result = base(senatorName)
      if (result.length === 1) result = result[0]
      if (result) resolve(result)
      else reject(new Error('No se encontro el senador ' + senatorName))
    })
  }
}
