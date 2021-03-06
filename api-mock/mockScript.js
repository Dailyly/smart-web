'use strict'
const Mock = require('mockjs')

function apiDataWrap (data, code = 0, message = '') {
  return { code, message, data }
}

module.exports.login = (req) => apiDataWrap(Mock.mock({
  'token': '@STRING(20, 60)',
  'id': 1,
  'account': req.body.account,
  'nick': 'smartweb',
  'avatar': `@IMAGE(128x128, #02adea, ${req.body.account})`,
  'createdAt': '2019-06-09T07:48:34.000Z',
  'isSA': true
}))

module.exports.submit = (add) => apiDataWrap(add ? Math.floor(Math.random() * 1000000) : true)

module.exports.list = (columns, page = 0, pageSize = 20, total = 200) => {
  const totalPage = Math.ceil(total / pageSize)
  const size = (page === totalPage - 1) ? total % pageSize : pageSize
  return apiDataWrap(Mock.mock({
    [`rows|${size}`]: Array.isArray(columns) ? columns : [],
    total
  }))
}

module.exports.getJsonFile = (dir, params) => {
  const fs = require('fs')
  const path = require('path')
  return JSON.parse(fs.readFileSync(path.join(__dirname, dir + '.json')))
}