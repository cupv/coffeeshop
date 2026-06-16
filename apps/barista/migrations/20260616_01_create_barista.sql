CREATE TABLE
    IF NOT EXISTS `baristas` (
        `id` VARCHAR(36) NOT NULL,
        `name` VARCHAR(36) NOT NULL,
        `type` INT NOT NULL,
        `orderId` VARCHAR(36) NOT NULL,
        `completedAt` TIMESTAMP(6) NULL,
        `modifiedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (`id`),
        INDEX `order_id` (`orderId`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;