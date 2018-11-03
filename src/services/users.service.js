const _ = require('lodash');
const bcrypt = require('bcrypt');
const UserItem = require('../dto/user.item');
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
function createUserDbRecord(user) {
  try {
    const userModel = new UserItem.model(user.object);
    return await userModel.save();
  } catch (err) {
    throw new DBAccessError(err.message);
  }
}
/**
 * check if user with such data already exists in db;
 * @param {*} user 
 * returns true if user exists / false if user does not exists;
 */
function checkUserExists(user) {
  const user = getUserByEmail(user.email);
  return user ? true : false;
}
/**
 * @param {string} email 
 * @returns user record from data base;
 * @returns null if there is no user records in data base with give email;
 * @throws DBAccessError if there is a problem with db connection;
 */
function getUserByEmail(email) {
  try {
    return await UserItem.model.findOne({ email: email });
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
