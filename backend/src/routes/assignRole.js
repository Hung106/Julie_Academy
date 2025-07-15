// backend/src/routes/assignRole.js
const express = require('express');
const router = express.Router();
const { assignRole } = require('../controllers/assignRoleController');

router.post('/', assignRole);

module.exports = router;
