'use strict'
/* global fetch */

const baseUrl = 'https://min-api.cryptocompare.com/data/'

function fetchJSON (url) {
  return fetch(url)
    .then(res => res.json())
    .then(body => {
      if (body.Response === 'Error') throw body.Message
      return body
    })
}

function price (fsym, tsyms, tryConversion) {
  let url = `${baseUrl}price?fsym=${fsym}&tsyms=${tsyms}`
  if (tryConversion === false) url += '&tryConversion=false'
  return fetchJSON(url)
}

function priceHistorical (fsym, tsyms, time, tryConversion) {
  if (!(time instanceof Date)) throw new Error('time parameter must be an instance of Date.')
  time = Math.floor(time.getTime() / 1000)
  let url = `${baseUrl}pricehistorical?fsym=${fsym}&tsyms=${tsyms}&ts=${time}`
  if (tryConversion === false) url += '&tryConversion=false'
  // The API returns json with an extra layer of nesting, so remove it
  return fetchJSON(url).then(result => result[fsym])
}

module.exports = {
  price,
  priceHistorical
}
