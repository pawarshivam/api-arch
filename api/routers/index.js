const libs = global.absolute('api/libs');

/* ------------------------------------------------ */
const ping   = global.absolute('api/routers/ping');
const user   = global.absolute('api/routers/user');
const org    = global.absolute('api/routers/org');

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = () => {
  const router = libs.express.Router();

  ping(router);
  user(router);
  org(router);

  return router;
};
