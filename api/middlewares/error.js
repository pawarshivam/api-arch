// Error handler
module.exports = async (request, response, next) => {
  next(request.error);
};
