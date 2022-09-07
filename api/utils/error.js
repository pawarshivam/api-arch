const libs = global.absolute('api/libs');

/* ================================================ */
class HTTPError extends Error {
  constructor(error, info) {
    super(error);

    libs.joi.assert(
      error,
      libs.joi
        .number()
        .valid(404)
        .required(),
    );

    this.info = info;
  }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = {
  HTTPError,
};
