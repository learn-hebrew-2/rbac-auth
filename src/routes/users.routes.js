const express = require('express');
const router = express.Router();
const usersService = require('../services/users.service');
const DBAccessError = require('../errors/db-access.error');
const IllegalArgumentError = require('../errors/illegal-argument.error');
const ExistingMediaError = require('../errors/existing-media.error');
const NoSuchMediaError = require('../errors/no-such-media.error');
const DataAccessError = require('../errors/data-access.error');

/**
 * /api/users/ - get all users;
 */
router.get('/', async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    return res.status(200).send(users);
  } catch (err) {
    if (err instanceof DBAccessError) {
      return res.status(500).send('internal server error');
    }
  }
});
/**
 * GET:/api/users/from/left-index/to/right-index - get all users between boundaries;
 */
router.get('/from/:begin/to/:end', async (req, res) => {
  const begin = req.body.begin;
  const end = req.body.end;
  try {
    const users = await usersService.getUsers(begin, end);
    return res.status(200).send(users);
  } catch (err) {
    if (err instanceof DBAccessError) {
      return res.status(500).send('internal server error');
    } else if (err instanceof IllegalArgumentError) {
      return res.status(400).send('bad request');
    }
  }
});
/**
 * GET:/api/users/user-id - get user by id;
 */
router.get('/from/:id', async (req, res) => {
  const id = req.body.id;
  try {
    const user = await usersService.getUser(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof DBAccessError) {
      return res.status(500).send('internal server error');
    } else if (err instanceof IllegalArgumentError) {
      return res.status(400).send('bad request');
    } else if (err instanceof NoSuchMediaError) {
      return res.status(404).send('User not found')
    }
  }
});
/**
 * POST:/api/users/ - create user
 */
router.post('/', async (req, res) => {
  let user = req.body;
  try {
    const user = await usersService.createUser(user);
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof DBAccessError) {
      return res.status(500).send('internal server error');
    } else if (err instanceof IllegalArgumentError) {
      return res.status(400).send('bad request');
    } else if (err instanceof ExistingMediaError) {
      return res.status(409).send('User already exists')
    }
  }
});
/**
 * DELETE:/api/users/:id - delete user
 */
router.delete('/:id', async (req, res) => {
  const id = req.body.id;
  try {
    const user = await usersService.deleteUser(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err instanceof DBAccessError) {
      return res.status(500).send('internal server error');
    } else if (err instanceof NoSuchMediaError) {
      return res.status(400).send('bad request');
    }
  }
});
/**
 * PUT:/api/users/ - update user
 */
router.put('/', async (req, res) => {
  let user = req.body;
  try {
    const user = await usersService.updateUser(user);
    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof DBAccessError) {
      return res.status(500).send('internal server error');
    } else if (err instanceof IllegalArgumentError) {
      return res.status(400).send('bad request');
    } else if (err instanceof ExistingMediaError) {
      return res.status(409).send('User already exists')
    } else if (err instanceof NoSuchMediaError) {
      return res.status(404).send('User not found');
    }
  }
});
/**
 * POST:/api/users/login - create new user session;
 */
router.post('/login', async (req, res) => {
  let user = req.body;
  try {
    const token = await usersService.updateUser(user);
    return res.status(200).send(token);
  } catch (err) {
    if (err instanceof DBAccessError) {
      return res.status(500).send('internal server error');
    } else if (err instanceof IllegalArgumentError) {
      return res.status(400).send('bad request');
    } else if (err instanceof NoSuchMediaError) {
      return res.status(404).send('User not found');
    } else if (err instanceof DataAccessError) {
      return res.status(401).status('Access denied');
    }
  }
});

module.exports = router;
