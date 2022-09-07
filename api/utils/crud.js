const libs  = global.absolute('api/libs');

/* ------------------------------------------------ */
const error = global.absolute('api/utils/error');

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.create = async (Model, object) => {
  const instance = new Model(object);
  await instance.save();

  return instance;
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.getOne = async (Model, id, conditions) => {
  // id should be a valid mongoose object id
  libs.joi.assert(id, libs.joi.string().hex().length(24));

  // Document should exist
  const instance = await Model.findOne({
    _id: id,
    ...conditions,
  });

  if (instance === null) {
    throw new error.HTTPError(404, '');
  }

  return instance;
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.getMany = async (Model, conditions) => {
  const instances = await Model.find(conditions);

  return instances;
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.update = async (Model, object, id, conditions) => {
  // Check if document exists
  module.exports.getOne(Model, id, conditions);

  // Update the document
  const updatedInstance = await Model.findOneAndUpdate(
    {
      _id: id,
      ...conditions,
    },
    object,
    {
      runValidators: true,
      new: true,
    },
  );

  return updatedInstance;
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++ */
module.exports.delete = async (Model, id, conditions) => {
  // Check if document exists
  module.exports.getOne(Model, id, conditions);

  // Delete the document
  const deletedInstance = await Model.findOneAndDelete({
    _id: id,
    ...conditions,
  });

  return deletedInstance;
};
