-- AlterTable
ALTER TABLE "Clap" ALTER COLUMN "id" SET DEFAULT concat('clap_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT concat('comment_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Following" ALTER COLUMN "id" SET DEFAULT concat('following_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Save" ALTER COLUMN "id" SET DEFAULT concat('save_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "id" SET DEFAULT concat('story_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Topics" ALTER COLUMN "id" SET DEFAULT concat('topic_', replace(cast(gen_random_uuid() as text), '-', ''));

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "firstname" TEXT,
    "imageProfile" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
