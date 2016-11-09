'use strict'
const scraperjs = require('scraperjs')
const assert = require('assert')
const URL = 'http://www.senado.cl/appsenado/index.php?mo=senadores&ac=listado'

// get senators from a query
// (obj, fn) -> obj
const getSenadores = (query, cb) => {
  assert.equal(typeof query, 'object')
  assert(query.hasOwnProperty('q'))

  scraperjs.StaticScraper.create(URL)
    .scrape($ => {
      return $('table td:last-child').map(function () {
        let nombre = $(this).find('div').first().text()
        let region = $(this).find('div:nth-child(2)').find('strong').first().text()
        let circunscripcion = parseInt($(this).find('div:nth-child(2)').find('strong').first().next().text(), 10)
        let str = $(this).find('div').last().text()
        let telefono = str.substr(str.indexOf('('), 15)
        let mail = $(this).find('div:nth-child(3)').find('a').text()
        let partido = $(this).parents('td').next().first().find('strong').text()
        let senador = {
          nombre,
          region,
          circunscripcion,
          telefono,
          mail,
          partido
        }
        return senador
      }).get()
    })
    .then(cb)
}

module.exports = function senadores (opts, cb) {
  if (!cb) {
    cb = opts
    opts = undefined
  }
  if (typeof opts === 'string') getSenadores({ q: { name: opts } }, cb) // search by name
  if (typeof opts === 'number') getSenadores({ q: { rut: opts } }, cb) // search by rut
  if (typeof opts === 'object') getSenadores(opts, cb) // search by query
  if (!opts) getSenadores({ q: {} }, cb) // get all
}
