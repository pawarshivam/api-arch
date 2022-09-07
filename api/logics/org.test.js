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
test('[org.create] Should create a org', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  const { org: orgInstance } = await logics.org.create({
    authUserInstance: userInstance,
  }, {
    org: seeds.orgs[0],
  }, { });

  expect(orgInstance.toObject()).toMatchObject(seeds.orgs[0]);
  expect(orgInstance.admins.indexOf(userInstance._id)).not.toEqual(-1);
});

/* ------------------------------------------------ */
test('[org.getOne] Should get the org by id', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  const { org: orgInstance } = await logics.org.create({
    authUserInstance: userInstance,
  }, {
    org: seeds.orgs[0],
  }, { });

  const response = await logics.org.getOne({
    authUserInstance: userInstance,
  }, { }, {
    id: orgInstance._id.toHexString(),
  });

  expect(response.org.toObject()).toMatchObject(orgInstance.toObject());
});

test('[org.getOne] Should throw an error when a wrong org id is provided in query params', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  // Invalid object id
  try {
    await logics.org.getOne({
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
    await logics.org.getOne({
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
test('[org.update] Should update the org by id', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  const { org: orgInstance } = await logics.org.create({
    authUserInstance: userInstance,
  }, {
    org: seeds.orgs[0],
  }, { });

  await logics.org.update({
    authUserInstance: userInstance,
  }, {
    org: seeds.orgs[1],
  }, {
    id: orgInstance._id.toHexString(),
  });
});

/* ------------------------------------------------ */
test('[org.delete] Should delete the org by id', async () => {
  const { user: userInstance } = await logics.user.create({ }, {
    user: seeds.users[0],
  }, { });

  const { org: orgInstance } = await logics.org.create({
    authUserInstance: userInstance,
  }, {
    org: seeds.orgs[0],
  }, { });

  const response = await logics.org.delete({
    authUserInstance: userInstance,
  }, { }, {
    id: orgInstance._id.toHexString(),
  });

  expect(response.org.email).toEqual(orgInstance.email);

  try {
    await logics.org.getOne({
      authUserInstance: userInstance,
    }, { }, {
      id: orgInstance._id.toHexString(),
    });

    throw new Error('Above call should throw an error');
  } catch (error) {
    expect(error.message).toBe('404');
  }
});
