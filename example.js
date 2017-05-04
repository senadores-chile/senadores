const senadores = require('./')

senadores({
  gastosElecciones: '>500000000',
  incluyeSenador: true
}, 'elecciones.gastos').then(s => {
  console.log(s)
})
