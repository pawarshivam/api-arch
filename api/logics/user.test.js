const libs    = global.absolute('api/libs');
const loaders = global.absolute('api/loaders');
const logics  = global.absolute('api/logics');
const seeds   = global.absolute('api/seeds');

/* ================================================ */
beforeAll(async () => {
  await loaders.mongodb.connect();
});

beforeEach(async () => {
  await loaders.mongodb.drop();
});

afterAll(async () => {
  await loaders.mongodb.disconnect();
});

afterEach(async () => {
  await loaders.mongodb.drop();
});

/* ================================================ */
test('[user.create] Should create a user', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  expect(userInstance.email).toEqual(seeds.users[0].email);
  expect(userInstance.password).not.toEqual(seeds.users[0].password);
});

/* ------------------------------------------------ */
test('[user.getOne] Should get the user by id', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  const response = await logics.user.getOne({
    authUserInstance: userInstance,
  }, { }, {
    id: userInstance._id.toHexString(),
  });

  expect(response.user.toObject()).toMatchObject(userInstance.toObject());
});

test('[user.getOne] Should throw an error when a wrong user id is provided in query params', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  // Invalid object id
  try {
    await logics.user.getOne({
      authUserInstance: userInstance,
    }, { }, {
      id: '0',
    });

    throw new Error('Above call should throw an error');
  } catch (error) {
    expect(error.name).toBe('ValidationError');
  }

  // Non existing but valid object id
  const objectId = libs.mongoose.Types.ObjectId();

  try {
    await logics.user.getOne({
      authUserInstance: userInstance,
    }, { }, {
      id: objectId.toHexString(),
    });

    throw new Error('Above call should throw an error');
  } catch (error) {
    expect(error.message).toBe('404');
  }
});

/* ------------------------------------------------ */
test('[user.update] Should update the user by id', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  await logics.user.update({
    authUserInstance: userInstance,
  }, {
    user: seeds.users[1],
  }, {
    id: userInstance._id.toHexString(),
  });
});

/* ------------------------------------------------ */
test('[user.delete] Should delete the user by id', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  const response = await logics.user.delete({
    authUserInstance: userInstance,
  }, { }, {
    id: userInstance._id.toHexString(),
  });

  expect(response.user.email).toEqual(userInstance.email);

  try {
    await logics.user.getOne({
      authUserInstance: userInstance,
    }, { }, {
      id: userInstance._id.toHexString(),
    });

    throw new Error('Above call should throw an error');
  } catch (error) {
    expect(error.message).toBe('404');
  }
});

/* ------------------------------------------------ */
test('[user.login] Should authenticate the user', async () => {
  await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  const { user: userInstance, token } = await logics.user.login({ }, {
    user: seeds.users[0],
  }, { });

  expect(userInstance.email).toEqual(seeds.users[0].email);
  expect(token).toBeTruthy();
});
