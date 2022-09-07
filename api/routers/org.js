const libs        = global.absolute('api/libs');
const middlewares = global.absolute('api/middlewares');
const logics      = global.absolute('api/logics');

/* ================================================ */
const org = libs.express.Router();

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = (router) => {
  router.use('/org', org);

  org.put('/', middlewares.integration(logics.org.create));
  org.get('/one/:id', middlewares.integration(logics.org.getOne));
  org.get('/many', middlewares.integration(logics.org.getMany));
  org.patch('/:id', middlewares.integration(logics.org.update));
};
