const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const upsertUser = async (userData) => {
  const { id, email, username, firstName, lastName, role, status } = userData;

  return await prisma.user.upsert({
    where: { id: id },
    update: {
      email,
      username,
      firstName,
      lastName,
      role,
      status,
    },
    create: {
      id,
      email,
      username,
      firstName,
      lastName,
      role,
      status,
    },
  });
};

module.exports = { upsertUser };