#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('ass:server');
var http = require('http');

/**
 * 或是以下程式碼都不需要
 * 直接使用 `app.listen(3000)`
 */

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// 使用 host 0.0.0.0 好處：可用 localhost 或是 [內部ip] 來瀏覽你的專案，
// 所以可以打 http://localhost:3000/ 或是 http://內部ip:3000/ 來查看。
// 可以使用同個網域下的其他裝置來瀏覽你電腦裡的專案！
var host = process.env.HOST || '0.0.0.0';
app.set('host', host);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('listening', onListen)
server.on('error', onError);
server.on('listening', onListening);

function onListen() {
  console.info("🌎 Server is listening on port %s, please open: http://%s:%d/  .....", port, host, port);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
