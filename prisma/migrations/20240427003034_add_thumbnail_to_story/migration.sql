-- AlterTable
ALTER TABLE "Clap" ALTER COLUMN "id" SET DEFAULT concat('clap_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT concat('comment_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Following" ALTER COLUMN "id" SET DEFAULT concat('following_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "liked" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Save" ALTER COLUMN "id" SET DEFAULT concat('save_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "thumbnailUrl" TEXT,
ALTER COLUMN "id" SET DEFAULT concat('story_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Topics" ALTER COLUMN "id" SET DEFAULT concat('topic_', replace(cast(gen_random_uuid() as text), '-', ''));
