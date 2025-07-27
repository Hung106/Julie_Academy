const express = require("express");
const authController = require("../controllers/auth.controller");
const keycloak = require("../middlewares/keycloak.middleware");

const router = express.Router();

router.post("/sync", keycloak.protect(), authController.syncUser);

module.exports = router;
