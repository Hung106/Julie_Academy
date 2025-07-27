/*
  Warnings:

  - You are about to drop the column `author_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `question_data` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `question_type` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `questions` table. All the data in the column will be lost.
  - Added the required column `content` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE_SINGLE', 'MULTIPLE_CHOICE_MULTI', 'FILL_IN_BLANK', 'ORDERING');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_author_id_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "author_id",
DROP COLUMN "question_data",
DROP COLUMN "question_type",
DROP COLUMN "tags",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL,
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "type" "QuestionType" NOT NULL;

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "question_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "orderIndex" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "skill_name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_skills" (
    "question_id" TEXT NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "question_skills_pkey" PRIMARY KEY ("question_id","skill_id")
);

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_skills" ADD CONSTRAINT "question_skills_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_skills" ADD CONSTRAINT "question_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
