/*
  Warnings:

  - A unique constraint covering the columns `[twoFactorAuthenticationSecret]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `twoFactorAuthenticationSecret` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `twoFactorAuthenticationSecret` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_twoFactorAuthenticationSecret_key` ON `User`(`twoFactorAuthenticationSecret`);
