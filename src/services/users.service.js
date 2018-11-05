const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const config = require('config');
const debug_user = require('debug')('app:ctrl-user');
const { UserItem, schema, model } = require('../dto/user.item');
const IllegalArgumentError = require('../errors/illegal-argument.error');
const ExistingMediaError = require('../errors/existing-media.error');
const DBAccessError = require('../errors/db-access.error');
const NoSuchMediaError = require('../errors/no-such-media.error');
const DataAccessError = require('../errors/data-access.error');
const jwt = require('jsonwebtoken');

/**
   * creates new user in db users collection; 
   * @param user 
   * @returns created user record; 
   * @throws ExistingMediaException if such user already exists;
   * @throws IllegalArgumentException if given data is not valid;
   */
async function createUser(user) {
  if (user == null || user.name == null || user.email == null || user.password == null || user.type == null) {
    throw new IllegalArgumentError();
  }
  if (await checkUserExists(user)) {
    throw new ExistingMediaError('User');
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  return await createUserDbRecord(user);
}
/**
 * creates new user record in data base;
 * @param {*} user 
 * @returns created db user record;
 * @throws DBAccessError if there is a problem with db connection;
 */
async function createUserDbRecord(user) {
  if (!user || user.name == null || user.email == null || user.password == null || user.type == null) {
    throw new IllegalArgumentError();
  }
  try {
    const UserModel = new model(user);
    return await UserModel.save();
  } catch (err) {
    debug_user(err.message);
    throw new DBAccessError(err.message);
  }
}
/**
 * check if user with such data already exists in db;
 * @param {*} user 
 * returns true if user exists / false if user does not exists;
 */
async function checkUserExists(user) {
  if (!user || user.email == null) {
    throw new IllegalArgumentError();
  }
  const res = await model.findOne({email: user.email});
  return res ? true : false;
}
/**
 * @param {string} email 
 * @returns user record from data base;
 * @returns null if there is no user records in data base with give email;
 * @throws DBAccessError if there is a problem with db connection;
 */
async function getUserByEmail(email) {
  if (typeof email != 'string' || email === '') {
    throw new IllegalArgumentError();
  }
  let user;
  try {
    user = await model.findOne({ email: email });
  } catch (err) {
    throw new DBAccessError(err.message);
  }
  return user ? user : null;
}
/**
   * @returns all users records from db,;
   * @returns empty array in the case if there is no records in users collection;
   */
async function getAllUsers() {
  let users;
  try {
    users = await model.find();
  } catch (err) {
    debug_user(err.message);
    throw new DBAccessError();
  }
  return users;
}
/**
   * @returns all users records from db, which placed between given 
   * boundaries [first, last];
   * @returns empty array in the case if there is no records in users collection;
   * @throws IllegalArgumentException if given data is not valid;
   */
  async function getUsers(first, last) {
    if (typeof first != 'number' || typeof last != 'number' || arguments.length != 2 || isNaN(first) || isNaN(last) || !isFinite(first) || !isFinite(last)) {
      throw new IllegalArgumentError();
  }
  let users;
  try {
    users = await model
      .find()
      .skip(first)
      .limit(last - first);
  } catch (err) {
    debug_user(err.message);
    throw new DBAccessError();
  }
  return users;
}
/**
   * @param id 
   * @returns UserItem with given id
   * @throws NoSuchMediaException if there is no user with such id;
   * @throws IllegalArgumentException if given data is not valid;
   */
async function getUser(id) {
  try {
    const user = await model.findById(id);
    return user ? user : null;
  } catch (err) {
    debug_user(err.message);
    throw new DBAccessError();
  }
}
/**
   * deletes user record with given user id and
   * returns deleted object;
   * @param id
   * @returns deleted user record: UserItem;
   * @throws NoSuchMediaException in the case if there is no user 
   * record with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
async function deleteUser(id) {
  try {
    return await model.findByIdAndDelete(id);
  } catch (err) {
    debug_user(err.message);
    throw new DBAccessError();
  }
}
/**
   * updates user record with given id:string (user id) in db with
   * given new user: UserItem object;
   * @param id 
   * @returns updated user: UserItem;
   * @throws NoSuchMediaException in the case if there is no user record 
   * with given id;
   * @throws IllegalArgumentException if given data is not valid;
   */
async function updateUser(user) {
  if (!user || typeof user !== 'object') {
    throw new IllegalArgumentError();
  }
  const dbUser = await getUser(user._id);
  if (!dbUser) {
    throw new NoSuchMediaError('user');
  }
  console.log('old db user', dbUser)
  for(let field in user) {
    dbUser[field] = user[field];
  }
  console.log('new db user', dbUser)
  try {
    const res = await model.findByIdAndUpdate(user._id, dbUser, { new: false });
    console.log('updated', res);
    return res;
  } catch (err) {
    debug_user(err.message);
    throw new DBAccessError();
  }
}

async function createUserSession(user) {
  if (!user || !user.email || !user.password) {
    throw new IllegalArgumentError();
  }
  const dbUser = await getUserByEmail(user.email);
  if (!dbUser) {
    throw new NoSuchMediaError('user');
  }
  const isPassValid = await bcrypt.compare(user.password, dbUser.password);
  if (!isPassValid) {
    throw new DataAccessError('user');
  }
  const token = dbUser.generateAuthToken();
  return token;
}

module.exports = {
  createUser: createUser,
  createUserDbRecord: createUserDbRecord,
  checkUserExists: checkUserExists,
  getUserByEmail: getUserByEmail,
  getAllUsers: getAllUsers,
  getUsers: getUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  createUserSession: createUserSession,
  updateUser: updateUser
}