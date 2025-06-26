package com.ats.atssoftwarepro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record SignInRecord(@NotEmpty @Email String email,
                           @NotEmpty String password) {
}
