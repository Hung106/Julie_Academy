const questionService = require('../services/question.service.js');

// CREATE
const createQuestion = async (req, res, next) => {
  console.log('Received payload:', JSON.stringify(req.body, null, 2));
  try {
    const creatorId = req.kauth.grant.access_token.content.sub;
    const newQuestion = await questionService.createQuestion(req.body, creatorId);
    res.status(201).json(newQuestion);
  } catch (error) {
    next(error);
  }
};

// READ ALL
const getQuestions = async (req, res, next) => {
  try {
    const result = await questionService.getQuestions(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// READ ONE
const getQuestionById = async (req, res, next) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateQuestion = async (req, res, next) => {
  try {
    const updatedQuestion = await questionService.updateQuestion(req.params.id, req.body);
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteQuestion = async (req, res, next) => {
  try {
    await questionService.deleteQuestion(req.params.id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    // Xử lý trường hợp không tìm thấy để xóa (Prisma error P2025)
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Question not found' });
    }
    next(error);
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
