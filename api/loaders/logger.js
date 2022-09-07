const libs = global.absolute('api/libs');

/* ================================================ */
const transports = [];

transports.push(
  new libs.winston.transports.Console({
    format: libs.winston.format.combine(
      libs.winston.format.cli(),
      libs.winston.format.splat(),
    ),
  }),
);

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = libs.winston.createLogger({
  level: 'debug',
  levels: libs.winston.config.npm.levels,
  format: libs.winston.format.combine(
    libs.winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    libs.winston.format.errors({ stack: true }),
    libs.winston.format.splat(),
    libs.winston.format.json(),
  ),
  transports,
});
