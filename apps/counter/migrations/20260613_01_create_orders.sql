CREATE TABLE
    IF NOT EXISTS `orders` (
        `id` VARCHAR(36) NOT NULL,
        `source` INT NOT NULL,
        `memberId` VARCHAR(36) DEFAULT NULL,
        `status` INT NOT NULL DEFAULT 0,
        `modifiedAt` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        `createdAt` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
        `version` INT NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;