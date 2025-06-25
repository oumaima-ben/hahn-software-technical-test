package com.ats.atssoftwarepro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record SignUpRecord(@NotEmpty @Size(min = 2, max = 50) String firstName,
                           @NotEmpty @Size(min = 2, max = 50) String lastName,
                           @NotEmpty @Email String email,
                           @NotEmpty @Size(min = 8, message = "Password must be at least 8 characters long") String password
) {
}
