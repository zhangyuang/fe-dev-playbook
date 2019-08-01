#!/usr/bin/env node

const finalhandler = require('finalhandler')
const http = require('http')
const serveStatic = require('serve-static')
const open = require('open')

// Serve up public/ftp folder
var serve = serveStatic(`${__dirname}/docs/.vuepress/dist`, {
  'index': ['index.html', 'index.htm']
})

// Create server
var server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(3011, () => {
  open('http://127.0.0.1:3011')
})
