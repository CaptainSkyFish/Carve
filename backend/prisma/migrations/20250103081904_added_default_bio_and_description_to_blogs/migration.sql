-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" SET DEFAULT 'Welcome to my blog! I''m passionate about sharing ideas, stories, and insights that inspire and engage. Whether it''s about personal growth, creative endeavors, or the latest trends, this space is dedicated to exploring topics that matter. Let''s connect, learn, and grow together!';
