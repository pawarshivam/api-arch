const libs = global.absolute('api/libs');

/* ================================================ */
if (process.env.NODE_ENV === 'test') {
  libs.dotenv.config({
    path: '.test.env',
  });
} else {
  libs.dotenv.config({
    path: '.env',
  });
}

/* ------------------------------------------------ */
// NODE_ENV
libs.joi.assert(
  process.env.NODE_ENV,
  libs.joi
    .string()
    .valid('development', 'production', 'test')
    .required(),
);

// APP_HOST
libs.joi.assert(
  process.env.APP_HOST,
  libs.joi
    .string()
    .valid('localhost')
    .required(),
);

// APP_PORT
libs.joi.assert(
  process.env.APP_PORT,
  libs.joi
    .number()
    .integer()
    .min(1)
    .max(65535)
    .required(),
);

// MONGODB_HOST
libs.joi.assert(
  process.env.MONGODB_HOST,
  libs.joi
    .string()
    .uri({
      scheme: [
        'mongodb',
      ],
    })
    .required(),
);

// MONGODB_PORT
libs.joi.assert(
  process.env.MONGODB_PORT,
  libs.joi
    .number()
    .integer()
    .min(1)
    .max(65535)
    .required(),
);

// MONGODB_NAME
libs.joi.assert(
  process.env.MONGODB_NAME,
  libs.joi
    .string()
    .required(),
);

// JWT_SECRET
libs.joi.assert(
  process.env.JWT_SECRET,
  libs.joi
    .string()
    .required(),
);

// JWT_ALGORITHM
libs.joi.assert(
  process.env.JWT_ALGORITHM,
  libs.joi
    .string()
    .valid('HS256')
    .required(),
);

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports = {
  env: process.env.NODE_ENV,

  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },

  mongodb: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_NAME,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGORITHM,
  },
};
