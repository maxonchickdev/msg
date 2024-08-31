-- DropIndex
DROP INDEX `User_twoFactorAuthenticationSecret_key` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `twoFactorAuthenticationSecret` VARCHAR(255) NOT NULL DEFAULT '';
