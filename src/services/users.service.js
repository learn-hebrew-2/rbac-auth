const _ = require('lodash');
const bcrypt = require('bcrypt');
const debug_user = require('debug')('app:ctrl-user');
const { UserItem, schema, model } = require('../dto/user.item');
const IllegalArgumentError = require('../errors/illegal-argument.error');
const ExistingMediaError = require('../errors/existing-media.error');
const DBAccessError = require('../errors/db-access.error');
/**
   * creates new user in db users collection; 
   * @param user 
   * @returns created user record; 
   * @throws ExistingMediaException if such user already exists;
   * @throws IllegalArgumentException if given data is not valid;
   */
async function createUser(user) {
  if (user == null || user.name == null || user.email == null || user.password == null || user.type == null) throw new IllegalArgumentError();
  if (checkUserExists(user)) throw new ExistingMediaError('User');
  const salt = bcrypt.genSalt(10);
  user.password = bcrypt.hash(user.password, salt);
  createUserDbRecord(user);
}
/**
 * creates new user record in data base;
 * @param {*} user 
 * @returns created db user record;
 * @throws DBAccessError if there is a problem with db connection;
 */
async function createUserDbRecord(user) {
  // debug_user(user);
  try {
    const UserModel = new model(user);
    return await UserModel.save();
  } catch (err) {
    debug_user(err.message);
    console.log(err)
    throw new DBAccessError(err.message);
  }
}
/**
 * check if user with such data already exists in db;
 * @param {*} user 
 * returns true if user exists / false if user does not exists;
 */
async function checkUserExists(user) {
  const res = await getUserByEmail(user.email);
  return res ? true : false;
}
/**
 * @param {string} email 
 * @returns user record from data base;
 * @returns null if there is no user records in data base with give email;
 * @throws DBAccessError if there is a problem with db connection;
 */
async function getUserByEmail(email) {
  try {
    return await model.findOne({ email: email });
  } catch (err) {
    throw new DBAccessError(err.message);
  }
}

module.exports = {
  createUser: createUser,
  createUserDbRecord: createUserDbRecord,
  checkUserExists: checkUserExists,
  getUserByEmail: getUserByEmail
}

  // createUserSession(user): string {
  //   return "";
  // }

  // deleteUser(id: string): UserItem {
  //   return undefined;
  // }

// getUser(id: string): UserItem {
  //   return undefined;
  // }

  // getUsers(first?: number, last?: number): UserItem[] {
  //   return [];
  // }

  // updateUser(user: UserItem): UserItem {
  //   return undefined;
  // }

// }
