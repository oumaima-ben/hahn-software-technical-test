package com.ats.atssoftwarepro.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record OrderRecord(Long id,
                          Long userId,
                          List<OrderItemRequest> orderItems,
                          BigDecimal totalAmount,
                          LocalDateTime orderDate) {
}
