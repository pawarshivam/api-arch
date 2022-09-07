const libs        = global.absolute('api/libs');
const middlewares = global.absolute('api/middlewares');
const logics      = global.absolute('api/logics');

/* ================================================ */
const user = libs.express.Router();

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = (router) => {
  router.use('/user', user);

  user.put('/', middlewares.integration(logics.user.create));
  user.get('/one/:id', middlewares.integration(logics.user.getOne));
  user.get('/many', middlewares.integration(logics.user.getMany));
  user.patch('/:id', middlewares.integration(logics.user.update));
  user.post('/', middlewares.integration(logics.user.login));
};
