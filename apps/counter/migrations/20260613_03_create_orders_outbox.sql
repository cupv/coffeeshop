CREATE TABLE IF NOT EXISTS `orders_outbox` (
    `id` VARCHAR(36) NOT NULL,
    `type` VARCHAR(100) NOT NULL, -- e.g., 'Barista', 'Kitchen'
    `orderId` VARCHAR(36) NOT NULL,    -- Target entity identifier
    `eventType` VARCHAR(100) NOT NULL,    -- e.g., 'OrderCreated', 'OrderPaid'
    `payload` JSON NOT NULL,               -- The complete event payload body
    `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'PROCESSED', 'FAILED'
    `retryCount` INT NOT NULL DEFAULT 0,
    `errorMessage` TEXT DEFAULT NULL,
    `processedAt` TIMESTAMP(6) DEFAULT NULL,
    `createdAt` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`),
    INDEX `idx_status_created` (`status`, `createdAt`), 
    INDEX `idx_order` (`type`, `orderId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;