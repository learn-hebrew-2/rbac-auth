'use strict'
// LIBRARIES
require('dotenv').config();
const _ = require('lodash');
const debug_test = require('debug')('app:test');
const request = require('supertest');
const mongoose = require('mongoose');
const config = require('config');
// CLASSES
const { UserItem, model } = require('../../src/dto/user.item');
const { createUser, createUserDbRecord, checkUserExists, getUserByEmail } = require('../../src/services/users.service');
const IllegalArgumentError = require('../../src/errors/illegal-argument.error');
// ASSETS
const usersTestData = require('../../data/users');
let serverInstance;

describe('creation of new user in mongodb', () => {
  beforeEach(() => {
    serverInstance = require('../../src/index');
  });
  afterEach(async () => {
    serverInstance.close();
    // await UsersModel.remove({});
  });

  // it('should throw IllegalArgument error with not valid input', async () => {
  //   let res;
  //   try {
  //     await createUser();
  //   } catch (err) {
  //     res = err;
  //   }
  //   expect(res).toEqual(new IllegalArgumentError('user'));
  // });

  it('should throw ExistingMediaError if user to create already exists', async () => {

  });

  // it('should create new user record if such user does not exists', async () => {
  //   const user = usersTestData[3];
  //   const res = await createUser(user);
  //   expect(_.pick(res, ['name', 'email', 'password']))
  //     .toMatchObject(_.pick(user, ['name', 'email', 'password']));
  //   expect(res.type.equals(user.type)).toBeTruthy();
  // });
});

describe('createUserDbRecord', () => {
  beforeEach(async () => { });
  afterEach(async () => { await model.deleteMany({}); });

  it(`should create new user record in ${config.get('db')}`, async () => {
    const user = usersTestData[0];
    const res = await createUserDbRecord(user);
    expect(res).toBeDefined();
    expect(res).toHaveProperty('_id');
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
  beforeEach(async () => { });
  afterEach(async () => { await model.deleteMany({}); });

  it('should return false if user does not exists', async () => {
    const user = usersTestData[0];
    expect(await checkUserExists(user)).toBeFalsy();
  });

  it('should return true if user exists in db', async () => {
    await model.collection.insertMany(usersTestData);
    const user = usersTestData[0];
    const res = await checkUserExists(user);
    expect(await checkUserExists(user)).toBeTruthy();
  });
});

describe('getUserByEmail', () => {
  beforeEach(async () => { });
  afterEach(async () => { await model.deleteMany({}); });

  it('should return user record by given email', async () => {
    await model.collection.insertMany(usersTestData);
    const user = usersTestData[2];
    const res = await getUserByEmail(user.email);
    expect(_.pick(res, ['name', 'email', 'password']))
      .toMatchObject(_.pick(user, ['name', 'email', 'password']));
  });
});

