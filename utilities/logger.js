'use strict';

const winston = require('winston');
const fs = require('fs');
const logDir = 'log';
const env = process.env.NODE_ENV || 'development';
let logger;

winston.setLevels(winston.config.npm.levels);
winston.addColors(winston.config.npm.colors);

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}


logger = new ( winston.Logger )({
  transports: [
    new winston.transports.Console({
      level: 'info',
      colorize: true
    }),
    new winston.transports.File({
      level: env === 'development' ? 'debug' : 'info',
      filename: logDir + '/dash-logs.log',
      maxsize: 1024 * 1024 * 10,
      json: true
    })
  ]
});

module.exports = logger;


// Use this singleton instance of logger like:
// logger = require( 'Logger.js' );
// logger.debug( 'your debug statement' );
// logger.warn( 'your warning' );