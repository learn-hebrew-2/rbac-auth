const express = require('express');
const usersRoutes = require('../routes/users.routes');
const rolesRoutes = require('../routes/roles.routes');
const permissionsRoutes = require('../routes/permissions.routes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const checkPermissions = require('../middleware/permissions.middleware');

module.exports = function (server) {
  server.use(helmet());
  server.use(cors());
  server.use(express.json());
  // server.use(checkPermissions),
  server.use('/api/users', usersRoutes);
  server.use('/api/roles', rolesRoutes);
  server.use('/api/permissions', permissionsRoutes);
  server.use(compression);
  server.use(morgan('tiny'));
}