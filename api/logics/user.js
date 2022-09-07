const commons = global.absolute('api/commons');
const libs    = global.absolute('api/libs');
const models  = global.absolute('api/models');
const utils   = global.absolute('api/utils');

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.create = async ({ }, { user }, { }) => {
  const userInstance = new models.User(user);
  userInstance.password = libs.bcryptjs.hashSync(user.password, commons.config.user.password.salt);

  await userInstance.save();

  return {
    user: userInstance,
  };
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.getOne = async ({ authUserInstance }, { }, { id }) => {
  const userInstance = await utils.crud.getOne(models.User, id, {
    org: authUserInstance.org.toHexString(),
  });

  return {
    user: userInstance,
  };
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.update = async ({ authUserInstance }, { user }, { id }) => {
  // Sanitize
  delete user.email;
  delete user.phone;
  delete user.createdAt;
  delete user.updatedAt;

  // Update the userInstance
  const updatedUserInstance = await utils.crud.update(models.User, user, id, {
    org: authUserInstance.org.toHexString(),
  });

  return {
    user: updatedUserInstance,
  };
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.delete = async ({ authUserInstance }, { }, { id }) => {
  // Delete the userInstance
  const deletedUserInstance = await utils.crud.delete(models.User, id, {
    org: authUserInstance.org.toHexString(),
  });

  return {
    user: deletedUserInstance,
  };
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.login = async ({ }, { user }, { }) => {
  // User should exist
  const userInstance = await models.User.findOne({
    email: user.email,
  });

  // Passwords should match
  if (libs.bcryptjs.compareSync(user.password, userInstance.password) === false) {
    throw new utils.error.HTTPError(401, 'Authentication failed');
  }

  // Update user's session
  userInstance.session = libs.mongoose.Types.ObjectId();
  await userInstance.save();

  // Generate authorization token
  const token = libs.jsonwebtoken.sign(
    {
      _id: userInstance._id.toHexString(),
      session: userInstance.session.toHexString(),
    },
    commons.env.jwt.secret,
    {
      algorithm: commons.env.jwt.algorithm,
    },
  );

  return {
    token,
    user: userInstance,
  };
};
