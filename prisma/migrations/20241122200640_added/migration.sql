-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licenceNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sendDate` BIGINT NULL,
    `receivedDate` BIGINT NULL,
    `status` ENUM('RECIEVED', 'NOT_RECEIVED') NOT NULL DEFAULT 'NOT_RECEIVED',
    `accreditationStatus` ENUM('PENDING', 'ACCEPTED') NOT NULL DEFAULT 'PENDING',
    `receivedBy` VARCHAR(191) NULL,
    `dateClaimed` BIGINT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthCare` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licenceNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sendDate` BIGINT NULL,
    `receivedDate` BIGINT NULL,
    `status` ENUM('RECIEVED', 'NOT_RECEIVED') NOT NULL DEFAULT 'NOT_RECEIVED',
    `accreditationStatus` ENUM('PENDING', 'ACCEPTED') NOT NULL DEFAULT 'PENDING',
    `receivedBy` VARCHAR(191) NULL,
    `dateClaimed` BIGINT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
