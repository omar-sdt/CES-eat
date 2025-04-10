-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'RESTAURANT', 'DELIVERY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
