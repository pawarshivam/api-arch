// F*ck path hell
// eslint-disable-next-line import/no-dynamic-require, global-require
global.absolute = (name) => require(`${__dirname}/${name}`);

/* ================================================ */
const config = {
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = config;
