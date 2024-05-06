/*
  Warnings:

  - You are about to drop the column `post_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reposts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tweet_id` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TweetType" AS ENUM ('TWEET', 'RETWEET');

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- DropForeignKey
ALTER TABLE "reposts" DROP CONSTRAINT "reposts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "reposts" DROP CONSTRAINT "reposts_user_id_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "post_id",
ADD COLUMN     "tweet_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "reposts";

-- DropEnum
DROP TYPE "PostType";

-- CreateTable
CREATE TABLE "twitters" (
    "id" UUID NOT NULL,
    "content" VARCHAR(200) NOT NULL,
    "tweet_type" "TweetType" NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "twitters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retweets" (
    "id" UUID NOT NULL,
    "content" VARCHAR(200) NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "tweet_type" TEXT NOT NULL,

    CONSTRAINT "retweets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "twitters" ADD CONSTRAINT "twitters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "twitters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "twitters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
