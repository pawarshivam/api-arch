const libs        = global.absolute('api/libs');
const commons     = global.absolute('api/commons');
const routers     = global.absolute('api/routers');
const middlewares = global.absolute('api/middlewares');

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
// Configure the express app
module.exports = (app) => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  //
  app.use(libs.express.json({
    strict: true,
    limit: '2kb',
  }));

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(libs.cors());

  // HTTP Requests logger
  app.use(libs.morgan('dev'));

  app.disable('etag');

  // Static content
  app.use(libs.express.static(libs.path.join('static')));

  // Register routers
  app.use(commons.config.api.base, routers());

  // Register error handler
  app.use(middlewares.error);
};
