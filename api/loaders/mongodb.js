const libs    = global.absolute('api/libs');
const commons = global.absolute('api/commons');

/* ------------------------------------------------ */
const logger = global.absolute('api/loaders/logger');

/* ================================================ */
libs.mongoose.connection.on('error', (error) => {
  logger.error(error);
});

/* ------------------------------------------------ */
libs.mongoose.connection.on('connected', () => {
  logger.info(`${commons.config.app.name} server connected to database ${commons.env.mongodb.name}`);
});

/* ------------------------------------------------ */
const connect = async () => libs.mongoose.connect(`${commons.env.mongodb.host}/${commons.env.mongodb.name}`, {
  useNewUrlParser: true,
});

/* ------------------------------------------------ */
const disconnect = async () => libs.mongoose.connection.close();

/* ------------------------------------------------ */
const drop = async () => libs.mongoose.connection.db.dropDatabase();

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = {
  connect,
  disconnect,
  drop,
};
