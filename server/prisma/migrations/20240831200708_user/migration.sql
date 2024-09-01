-- AlterTable
ALTER TABLE `User` ADD COLUMN `twoFactorAuthenticationSecret` VARCHAR(255) NOT NULL DEFAULT '';
