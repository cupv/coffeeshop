CREATE TABLE
  IF NOT EXISTS `order_line_items` (
    `id` VARCHAR(36) NOT NULL,
    `type` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `status` INT NOT NULL DEFAULT 0,
    `isBaristaOrder` TINYINT (1) NOT NULL DEFAULT 0,
    `orderId` VARCHAR(36) NOT NULL,
    `modifiedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`),
    INDEX `order_id` (`orderId`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;