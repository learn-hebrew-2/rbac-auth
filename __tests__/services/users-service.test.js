'use strict'
// LIBRARIES
require('dotenv').config();
const _ = require('lodash');
const request = require('supertest');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
// CLASSES
const { model } = require('../../src/dto/user.item');
const { createUser, createUserDbRecord, checkUserExists, getUserByEmail, getAllUsers, getUser, getUsers, deleteUser, updateUser, createUserSession } = require('../../src/services/users.service');
const IllegalArgumentError = require('../../src/errors/illegal-argument.error');
const ExistingMediaError = require('../../src/errors/existing-media.error');
const DataAccessError = require('../../src/errors/data-access.error');
const NoSuchMediaError = require('../../src/errors/no-such-media.error');

// ASSETS
const usersTestData = require('../../data/users');
let serverInstance;

describe('USERS SERVICE TESTS', () => {
  beforeEach(async () => {
    serverInstance = require('../../src/index');
    await model.deleteMany({});
  });
  afterEach(async () => {
    serverInstance.close();
    await model.deleteMany({});
  });
  // --- CREATE USER TESTS --- //
  describe('CREATE USER TESTS', () => {
    describe('createUser', () => {
      it('should throw IllegalArgument error with not valid input', async () => {
        let res;
        const testUser = {
          name: 'n',
          email: '1',
        }
        const args = [null, undefined, NaN, Infinity, 1, true, {}, '', testUser];
        for (const a of args) {
          try {
            await createUser(a);
          } catch (err) {
            res = err;
          }
          expect(res).toEqual(new IllegalArgumentError('user'));
        };
      });

      it('should throw ExistingMediaError if user to create already exists', async () => {
        let res;
        await model.collection.insertMany(usersTestData);
        const user = usersTestData[0];
        try {
          await createUser(user);
        } catch (err) {
          res = err;
        }
        expect(res).toEqual(new ExistingMediaError('User'));
      });

      it('should create new user record if such user does not exists', async () => {
        const user = usersTestData[3];
        const res = await createUser(user);
        expect(_.pick(res, ['name', 'email', 'password']))
          .toMatchObject(_.pick(user, ['name', 'email', 'password']));
        expect(res.type.equals(user.type)).toBeTruthy();
      });
    });

    describe('createUserDbRecord', () => {
      it('should throw IllegalArgument error with not valid input', async () => {
        let res;
        const args = [null, undefined, NaN, Infinity, 1, true, '', {}];
        for (let a of args) {
          try {
            await createUserDbRecord(a);
          } catch (err) {
            res = err;
          }
          expect(res).toEqual(new IllegalArgumentError('user'));
        }
      });

      it(`should create new user record in ${config.get('db')}`, async () => {
        const user = usersTestData[0];
        const res = await createUserDbRecord(user);
        expect(res).toHaveProperty('_id');
        expect(_.pick(res, ['name', 'email', 'password']))
          .toMatchObject(_.pick(user, ['name', 'email', 'password']));
        expect(res.type.equals(user.type)).toBeTruthy();
      });

      it(`should create new user record in ${config.get('db')} and created record should contain all user fields`, async () => {
        const user = usersTestData[0];
        const res = await createUserDbRecord(user);
        res.type = mongoose.Types.ObjectId(res.type.id).toHexString();
        expect(_.pick(res, ['name', 'email', 'password']))
          .toMatchObject(_.pick(user, ['name', 'email', 'password']));
        expect(res.type.equals(user.type)).toBeTruthy();
      });
    });

    describe('checkUserExists', () => {
      it('should throw IllegalArgument error with not valid input', async () => {
        let res;
        const args = [null, undefined, NaN, Infinity, 1, true, {}, ''];
        for (let a of args) {
          try {
            await checkUserExists(a);
          } catch (err) {
            res = err;
          }
          expect(res).toEqual(new IllegalArgumentError('user'));
        }
      });

      it('should return false if user does not exists', async () => {
        const user = usersTestData[0];
        expect(await checkUserExists(user)).toBeFalsy();
      });

      it('should return true if user exists in db', async () => {
        await model.collection.insertMany(usersTestData);
        const user = usersTestData[0];
        expect(await checkUserExists(user)).toBeTruthy();
      });
    });
  });
  // --- GET USERS TESTS --- //
  describe('GET USERS TESTS', () => {
    describe('getAllUsers', () => {
      it('should return empty array if there are no user records', async () => {
        const res = await getAllUsers();
        expect(res).toMatchObject([]);
      });

      it('should return all existing user records', async () => {
        model.collection.insertMany(usersTestData);
        const res = await getAllUsers();
        expect(res.length).toBe(usersTestData.length);
        usersTestData.forEach(user => {
          const isContains = res.find(elem => elem.email === user.email);
          expect(isContains).toBeTruthy();
        });
      });
    });

    describe('getUsers', () => {
      it('should throw IllegalArgument error with not valid input', async () => {
        let res;
        const args = [null, undefined, NaN, Infinity, true, {}, ''];
        for (let a of args) {
          try {
            await getUsers(a, a);
          } catch (err) {
            res = err;
          }
          expect(res).toEqual(new IllegalArgumentError('user'));
        }
      });

      it('should return empty array if there are no user records', async () => {
        const res = await getUsers(1, 1);
        expect(res).toMatchObject([]);
      });

      it('should return only that count of records, which contains between given boundsries',
        async () => {
          const boundaries = {
            start: 1,
            end: 2
          };
          model.collection.insertMany(usersTestData);
          const res = await getUsers(boundaries.start, boundaries.end);

          expect(res.length).toBe(boundaries.end - boundaries.start);

          res.forEach(user => {
            const isContains = res.some(elem => elem.email === user.email);
            expect(isContains).toBeTruthy();
          });
        });
    });

    describe('getUser', () => {

      it('should return null if there is no user record with given id', async () => {
        const res = await getUser(mongoose.Types.ObjectId());
        expect(res).toBe(null);
      });

      it('should return valid user record from db', async () => {
        await model.collection.insertMany(usersTestData);
        const user = await model.findOne({ email: usersTestData[1]['email'] });
        const userId = user._id;
        const res = await getUser(userId);
        expect(res).toHaveProperty('_id');
        expect(_.pick(res, ['name', 'email', 'password']))
          .toMatchObject(_.pick(user, ['name', 'email', 'password']));
        expect(res.type.equals(user.type)).toBeTruthy();
      });
    });

    describe('getUserByEmail', () => {
      it('should throw IllegalArgument error with not valid input', async () => {
        let res;
        const args = [null, undefined, NaN, Infinity, 1, true, {}, ''];
        for (let a of args) {
          try {
            await getUserByEmail(a);
          } catch (err) {
            res = err;
          }
          expect(res).toEqual(new IllegalArgumentError('user'));
        }
      });

      it('should return null if there is no such user', async () => {
        const res = await getUserByEmail('non@existing.email');
        expect(res).toBe(null);
      });

      it('should return user record by given email', async () => {
        await model.insertMany(usersTestData);
        const user = usersTestData[2];
        const res = await getUserByEmail(user.email);
        expect(_.pick(res, ['name', 'email', 'password']))
          .toMatchObject(_.pick(user, ['name', 'email', 'password']));
      });
    });
  });
  // --- DELETE USER TESTS --- //
  describe('DELETE USER TESTS', () => {
    describe('deleteUser', () => {

      it('should remove user from db and return removed item', async () => {
        await model.insertMany(usersTestData);
        const user = await model.findOne({ email: usersTestData[1]['email'] });
        const userId = user._id;
        const res = await deleteUser(userId);

        expect(res).toHaveProperty('_id');
        const restoredUser = usersTestData
          .some(e => e.name === res.name && e.email === res.email);
        expect(restoredUser).toBeTruthy();
        expect(await model.findById(res._id)).toBe(null);
      });

    });
  });
  // --- UPDATE USER TESTS --- //
  describe('UPDATE USER TESTS', () => {
    describe('updateUser', () => {
      it('should throw IllegalArgument error with not valid input', async () => {
        let res;
        const args = [null, undefined, NaN, Infinity, 1, true];
        for (let a of args) {
          try {
            await updateUser(a);
          } catch (err) {
            res = err;
          }
          expect(res).toEqual(new IllegalArgumentError('user'));
        }
      });

      it('should throw NoSuchMediaError if there is no user with given email', async () => {
        let res;
        try {
          await createUserSession({ email: 'email', password: 'pass' });
        } catch (err) {
          res = err;
        }
        expect(res).toBeInstanceOf(NoSuchMediaError);
      });
//TODO
      // it('should update user from db and return updated item', async () => {
      //   await model.insertMany(usersTestData);
      //   const user = await model.findOne({ email: usersTestData[1].email });
      //   user.name = 'new user name';
      //   user.email = 'new@user.email';
      //   user.password = 'new_user_password';
      //   user.type = mongoose.Types.ObjectId();

      //   const res = await updateUser(user);

      //   expect(res).toBeDefined();
      //   expect(_.pick(res, ['_id', 'name', 'email', 'password', 'type']))
      //     .toEqual(_.pick(user, ['_id', 'name', 'email', 'password', 'type']));
      //   expect(model.findOne(user._id)).toEqual(user);
      // });
    });
  });
  // --- USER SESSION TEST --- //
  describe('USER SESSION', () => {
    it('should throw IllegalArgument error with not valid input', async () => {
      let res;
      const args = [null, undefined, NaN, Infinity, 1, true];
      for (let a of args) {
        try {
          await createUserSession(null);
        } catch (err) {
          res = err;
        }
        expect(res).toEqual(new IllegalArgumentError('user'));
      }
      try {
        await createUserSession({ email: 'asdf' });
      } catch (err) {
        res = err;
      }
      expect(res).toEqual(new IllegalArgumentError('user'));
    });

    it('should throw NoSuchMediaError if there is no user with given email', async () => {
      let res;
      try {
        await createUserSession({ email: 'email', password: 'pass' });
      } catch (err) {
        res = err;
      }
      expect(res).toBeInstanceOf(NoSuchMediaError);
    });

    it('should throw DataAccessError if passwords do not match', async () => {
      let res;
      let user = usersTestData[0];
      user = await createUser(user);
      try {
        await createUserSession(user);
      } catch (err) {
        res = err;
      }
      expect(res).toBeInstanceOf(DataAccessError);
    });

    it('should create new user token', async () => {
      const user = { email: 'email', password: 'password', name: 'name', type: mongoose.Types.ObjectId() };
      await createUser(user);
      const user1 = { email: 'email', password: 'password', name: 'name', type: mongoose.Types.ObjectId() };
      const token = await createUserSession(user1);
      expect(jwt.verify(token, config.get('jwtPrivateKey')))
        .toHaveProperty('name', user.name);
      expect(jwt.verify(token, config.get('jwtPrivateKey')))
        .toHaveProperty('email', user.email);
      expect(jwt.verify(token, config.get('jwtPrivateKey')))
        .toHaveProperty('type');
    });
  });
});