// F*ck path hell
// eslint-disable-next-line import/no-dynamic-require, global-require
global.absolute = (name) => require(`${__dirname}/${name}`);

/* ================================================ */
const libs    = global.absolute('api/libs');
const commons = global.absolute('api/commons');
const loaders = global.absolute('api/loaders');
const app     = global.absolute('api/index');

/* ================================================ */
const server = () => app.listen(commons.env.app.port, async () => {
  loaders.logger.info(`${commons.config.app.name} server live | port: ${commons.env.app.port} | env: ${commons.env.env} | process id: ${process.pid}`);
  await loaders.mongodb.connect();
});

// Start the server
if (commons.env.env === 'test') {
  server();
} else if (libs.os.cpus().length > 1) {
  if (libs.cluster.isMaster) {
    for (let index = 0; index < libs.os.cpus().length; index += 1) {
      libs.cluster.fork();
    }

    libs.cluster.on('exit', async () => {
      await loaders.mongoose.disconnect();
    });
  } else {
    server();
  }
} else {
  server();
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = server;
