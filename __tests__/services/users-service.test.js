'use strict'
require('dotenv').config();
const request = require('supertest');
const UserItem = require('../../src/dto/user.item');
const UserService = require('../../src/services/users.service');
const IllegalArgumentError = require('../../src/errors/illegal-argument.error');
const UsersModel = UserItem.model;
let serverInstance;

describe('creation of new user in mongodb', () => {
  beforeEach(() => { 
    serverInstance = require('../../src/index');
  });
  afterEach(() => { 
    serverInstance.close();
    await UsersModel.remove({});
  });

  it('should throw IllegalArgument error with not valid input', async () => {
    let res;
    try {
      await UserService.createUser();
    } catch (err) {
      res = err;
    }
    expect(res).toEqual(new IllegalArgumentError('user'));
  });
});
