const senadores = require('./')

senadores({
  partido: 'PS',
  asistenciaSala: '<.99'
}, 'asistencia.sala').then(s => {
  console.log(s)
})
