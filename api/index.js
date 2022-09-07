const libs    = global.absolute('api/libs');
const loaders = global.absolute('api/loaders');

/* ================================================ */
// Initialize the express app
const app = libs.express();
loaders.express(app);

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = app;
