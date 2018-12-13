const _ = require('lodash');
const request = require('supertest');
const mongoose = require('mongoose');
const { model } = require('../../src/dto/user.item');
let userTestData;
let serverInstance;

describe('USER ROUTES TEST', () => {
  beforeEach(async () => {
    serverInstance = await require('../../index');
    userTestData = await require('../../data/users');
    await model.deleteMany({});
  });

  afterEach(async () => {
    await model.deleteMany({});
    await serverInstance.close();
  });

  describe('GET:/api/users', () => {
    it('should fail', () => { });

    it('should return 200 and array of all users', async () => {
      await insertUsers();
      const res = await request(serverInstance).get('/api/users/');
      expect(res.status).toBe(200);
      res.body.forEach((user) => {
        const containsUser = userTestData.some(
            (testUser) => testUser.email == user.email
        );
        expect(containsUser).toBeTruthy();
      });
    });

    it('should return empty array if there is no users', async () => {
      const res = await request(serverInstance).get('/api/users/');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET:/api/users/from/:begin/to/:end', () => {
    it('should return "bad request" with not valid input data"', async () => {
      let res = await request(serverInstance)
          .get(`/api/users/from/s/to/1`);
      expect(res.status).toBe(400);

      res = await request(serverInstance)
          .get(`/api/users/from/4/to/2`);
      expect(res.status).toBe(400);
    });

    it('should return 200 and array of all users', async () => {
      await insertUsers();
      const bndrs = { begin: 1, end: 2 };
      const res = await request(serverInstance)
          .get(`/api/users/from/${bndrs.begin}/to/${bndrs.end}`);
      expect(res.status).toBe(200);
      res.body.forEach((user) => {
        const containsUser = userTestData.some(
            (testUser) => testUser.email == user.email
        );
        expect(containsUser).toBeTruthy();
      });
    });

    it('should return empty array if there is no users', async () => {
      const res = await request(serverInstance).get('/api/users/');
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET:/api/users/:id', () => {
    it('should return valid user object', async () => {
      const user = await insertUsersAndGetUser(1);
      const res = await request(serverInstance).get(`/api/users/${user['_id']}`);
      expect(res.status).toBe(200);
      expect(mongoose.Types.ObjectId(res.body['_id']).equals(user['_id']))
          .toBeTruthy();
      expect(_.pick(res.body, ['name', 'email']))
          .toEqual(_.pick(user, ['name', 'email']));
    });

    it('should return 404 if user not exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(serverInstance).get(`/api/users/${id}`);
      expect(res.status).toBe(404);
    });

    it('should return 400 if user id is not valid', async () => {
      const res = await request(serverInstance).get(`/api/users/asdgasd`);
      expect(res.status).toBe(400);
    });
  });

  describe('POST:/api/users/', () => {
    it('should create user and return created record and status 200', async () => {
      let user = userTestData[0];
      user = _.pick(user, ['name', 'email', 'password', 'type']);
      const res = await request(serverInstance).post(`/api/users/`).send(user);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(_.pick(res.body, ['name', 'email']))
          .toEqual(_.pick(user, ['name', 'email']));
    });

    it('should return status 400 with bad income data', async () => {
      const user = {
        name: '',
        email: '',
        password: '',
        type: 'asdg'
      }
      const res = await request(serverInstance).post(`/api/users/`).send(user);
      expect(res.status).toBe(400);
    });

    it('should return status 409 if given user data already exists', async () => {
      const user = await insertUsersAndGetUser(0);
      const res = await request(serverInstance)
        .post(`/api/users/`)
        .send(_.pick(user, ['name', 'email', 'password', 'type']));
      expect(res.status).toBe(409);
    });
  });

  describe('DELETE:/api/users/:id', () => {
    it('should delete user by given id', async () => {
      await insertUsersAndGetUser(1);
      const user = await getUser(0);
      const res = await request(serverInstance)
        .delete(`/api/users/${user._id}`);
      expect(res.status).toBe(200);
      expect(_.pick(res.body, ['name', 'email']))
        .toEqual(_.pick(user, ['name', 'email']));
    });

    // it('should return 200 and array of all users', async () => {
    //   await insertUsers();
    //   const res = await request(serverInstance).get('/api/users/');
    //   expect(res.status).toBe(200);
    //   res.body.forEach(user => {
    //     const containsUser = userTestData.some(
    //       testUser => testUser.email == user.email
    //     );
    //     expect(containsUser).toBeTruthy();
    //   });
    // });
  });

  describe('POST:/api/users/login', () => {
    // it('should create usr token and return status 200', async () => {
    //   const User = new model({name: 'name', email: 'email', password: 'password', type: '5bc378b07fac300ba4f4b894'});
    //   const user = await User.save();
    //   console.log(user)
    //   const res = await request(serverInstance)
    //     .post('/api/users/login')
    //     .send(user);
    //   console.log('token', res.body)
    //   expect(res.status).toBe(200);
    //   // expect(jwt.decode(res.body.token)).toHaveProperty('email', user.email);
    //   // expect(jwt.decode(res.body)).toHaveProperty('name');
    //   // expect(jwt.decode(res.body)).toHaveProperty('type');
    // });
  });

  describe('PUT:/api/users', () => {
    // it('should update user', async () => {
    //   const User = new model({name: 'name', email: 'email', password: 'password', type: '5bc378b07fac300ba4f4b894'});
    //   const user = await User.save();
    //   user.name = 'new name';
    //   const res = await request(serverInstance)
    //     .put('/api/users/')
    //     .send(user);
    //   console.log('update user res', res.body);
    // });
  });
});
/**
 * asdf
 */
async function insertUsers() {
  await model.insertMany(userTestData);
}

async function insertUsersAndGetUser(index) {
  await model.insertMany(userTestData);
  return await model.findOne({ email: userTestData[index]['email'] });
}

async function getUser(index) {
  return model.findOne({ email: userTestData[index]['email'] })
}