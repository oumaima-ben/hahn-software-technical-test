package com.ats.atssoftwarepro.dto;

import java.math.BigDecimal;

public record OrderItemRecord(Long productId,
                              String productName,
                              int quantity,
                              BigDecimal price) {
}
