const models = global.absolute('api/models');
const utils  = global.absolute('api/utils');

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.create = async ({ authUserInstance }, { org }, { }) => {
  const orgInstance = await utils.crud.create(models.Org, {
    ...org,
    _id: authUserInstance.org.toHexString(),
    admins: [
      authUserInstance._id.toHexString(),
    ],
  });

  return {
    org: orgInstance,
  };
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.getOne = async ({ authUserInstance }, { }, { id }) => {
  const orgInstance = await utils.crud.getOne(models.Org, id, {
    _id: authUserInstance.org.toHexString(),
  });

  return {
    org: orgInstance,
  };
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.update = async ({ authUserInstance }, { org }, { id }) => {
  // Sanitize
  delete org.email;
  delete org.phone;
  delete org.createdAt;
  delete org.updatedAt;

  // Update the orgInstance
  const updatedOrgInstance = await utils.crud.update(models.Org, org, id, {
    admins: {
      $in: [
        authUserInstance._id.toHexString(),
      ],
    },
  });

  return {
    org: updatedOrgInstance,
  };
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.delete = async ({ authUserInstance }, { }, { id }) => {
  // Delete the orgInstance
  const deletedOrgInstance = await utils.crud.delete(models.Org, id, {
    admins: {
      $in: [
        authUserInstance._id.toHexString(),
      ],
    },
  });

  return {
    org: deletedOrgInstance,
  };
};
