package com.ats.atssoftwarepro.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProductRecord(Long id,
                            @NotEmpty String name,
                            String description,
                            @NotNull @DecimalMin("0.01") BigDecimal price,
                            @NotNull @Min(0) Integer stockQuantity) {
}
