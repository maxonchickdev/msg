-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `currentHashedRefreshToken` VARCHAR(255) NOT NULL DEFAULT '',
    `twoFactorAuthenticationSecret` VARCHAR(255) NOT NULL DEFAULT '',
    `isTwoFactorAuthenticationEnabled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_userId_key`(`userId`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_password_key`(`password`),
    UNIQUE INDEX `User_currentHashedRefreshToken_key`(`currentHashedRefreshToken`),
    UNIQUE INDEX `User_twoFactorAuthenticationSecret_key`(`twoFactorAuthenticationSecret`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avatar` (
    `avatarId` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL DEFAULT '',
    `key` VARCHAR(255) NOT NULL DEFAULT '',
    `avatarKey` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Avatar_avatarId_key`(`avatarId`),
    UNIQUE INDEX `Avatar_url_key`(`url`),
    UNIQUE INDEX `Avatar_key_key`(`key`),
    UNIQUE INDEX `Avatar_avatarKey_key`(`avatarKey`),
    PRIMARY KEY (`avatarId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Avatar` ADD CONSTRAINT `Avatar_avatarKey_fkey` FOREIGN KEY (`avatarKey`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
