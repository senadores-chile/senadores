const senadores = require('./')

// muestra los senadores que gastaron mas de $500.000.000 en las elecciones pasadas.

senadores({
  gastosElecciones: '>500000000',
  incluyeSenador: true
}, 'elecciones.gastos').then(s => {
  console.log(s)
})
