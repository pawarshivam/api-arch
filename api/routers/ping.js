const libs        = global.absolute('api/libs');
const middlewares = global.absolute('api/middlewares');
const logics      = global.absolute('api/logics');

/* ================================================ */
const ping = libs.express.Router();

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = (router) => {
  router.use('/ping', ping);

  ping.get('/', middlewares.integration(logics.ping.get));
};
