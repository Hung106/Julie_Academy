const express = require('express');
const questionController = require('../controllers/question.controller');
const keycloakMiddleware = require('../middlewares/keycloak.middleware');

const router = express.Router();

router.post('/', keycloakMiddleware.protect(), questionController.createQuestion);
router.get('/', keycloakMiddleware.protect(), questionController.getQuestions);
router.get('/:id', keycloakMiddleware.protect(), questionController.getQuestionById);
router.put('/:id', keycloakMiddleware.protect(), questionController.updateQuestion);
router.delete('/:id', keycloakMiddleware.protect(), questionController.deleteQuestion);

module.exports = router;