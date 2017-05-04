const senadores = require('./')

senadores({
  partido: 'PS',
  asistenciaSala: '<.99',
  incluyeSenador: true
}, 'asistencia.sala').then(s => {
  console.log(s)
})
