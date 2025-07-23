const express = require('express');
const userController = require('../controllers/user.controller');
const keycloak = require('../middlewares/keycloak.middleware');

const router = express.Router();

router.post('/assign-role', keycloak.protect(), userController.assignRole);

module.exports = router;