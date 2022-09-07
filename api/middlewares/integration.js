// Map a route to a logic
module.exports = (logic) => async (request, response, next) => {
  if (request.error) next();
  else {
    try {
      response.json(
        /* eslint-disable no-multi-spaces */
        await logic(
          { ...request.session },
          { ...request.body    },
          { ...request.params  },
        ),
        /* eslint-enable no-multi-spaces */
      );
    } catch (error) {
      request.error = error;
      next();
    }
  }
};
