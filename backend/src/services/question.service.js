const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * CREATE: Tạo câu hỏi mới với answers và skills
 */
const createQuestion = async (questionData, creatorId) => {
  const { content, difficulty, explanation, type, answers, skills } = questionData;

  return prisma.question.create({
    data: {
      content,
      difficulty,
      explanation,
      type,
      creator: { connect: { id: creatorId } },
      answers: {
        create: answers.map(answer => ({
          content: answer.content,
          isCorrect: answer.isCorrect,
        })),
      },
      skills: {
        create: skills.map(skill => ({
          skill: {
            connectOrCreate: {
              where: { skillName: skill.skillName },
              create: { skillName: skill.skillName, subject: skill.subject || 'Chung' },
            },
          },
        })),
      },
    },
    include: { answers: true, skills: { include: { skill: true } } },
  });
};

/**
 * READ: Lấy danh sách câu hỏi (phân trang, lọc)
 */
const getQuestions = async (queryParams) => {
  const { page = 1, limit = 10, difficulty } = queryParams;
  const skip = (page - 1) * limit;
  const take = parseInt(limit, 10);

  const where = difficulty ? { difficulty } : {};

  const [questions, total] = await prisma.$transaction([
    prisma.question.findMany({
      where,
      skip,
      take,
      include: { skills: { include: { skill: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.question.count({ where }),
  ]);

  return { data: questions, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

/**
 * READ: Lấy một câu hỏi theo ID
 */
const getQuestionById = async (id) => {
  return prisma.question.findUnique({
    where: { id },
    include: { answers: true, skills: { include: { skill: true } }, creator: { select: { id: true, username: true } } },
  });
};

/**
 * UPDATE: Cập nhật một câu hỏi
 */
const updateQuestion = async (id, questionData) => {
  const { answers, skills, ...otherData } = questionData;

  return prisma.$transaction(async (tx) => {
    // 1. Cập nhật các trường chính của câu hỏi
    await tx.question.update({
      where: { id },
      data: {
        ...otherData,
        // 2. Cập nhật skills: Xóa các skill cũ và kết nối skill mới
        skills: {
          deleteMany: {}, // Xóa tất cả các liên kết QuestionSkill cũ
          create: skills ? skills.map(skill => ({
            skill: {
              connect: { id: skill.id } // Kết nối với skill đã có
            }
          })) : [],
        },
      },
    });

    // 3. Cập nhật answers: Xóa hết answers cũ và tạo lại answers mới
    if (answers) {
      await tx.answer.deleteMany({ where: { questionId: id } });
      await tx.answer.createMany({
        data: answers.map(answer => ({
          content: answer.content,
          isCorrect: answer.isCorrect,
          orderIndex: answer.orderIndex,
          questionId: id,
        })),
      });
    }

    // Lấy lại câu hỏi đầy đủ sau khi cập nhật
    return tx.question.findUnique({
      where: { id },
      include: { answers: true, skills: { include: { skill: true } } },
    });
  });
};


/**
 * DELETE: Xóa một câu hỏi
 */
const deleteQuestion = async (id) => {
  // `onDelete: Cascade` trong schema sẽ tự động xóa các Answer và QuestionSkill liên quan
  return prisma.question.delete({ where: { id } });
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
