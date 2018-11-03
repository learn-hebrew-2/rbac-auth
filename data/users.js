const { UserItem } = require('../src/dto/user.item');
const mongoose = require('mongoose');

module.exports = [
  new UserItem(null, 'user1', 'email1@mail.com', 'password', mongoose.Types.ObjectId()),
  new UserItem(null, 'user2', 'email2@mail.com', 'password', mongoose.Types.ObjectId()),
  new UserItem(null, 'user3', 'email3@mail.com', 'password', mongoose.Types.ObjectId()),
  new UserItem(null, 'user4', 'email4@mail.com', 'password', mongoose.Types.ObjectId()),
]