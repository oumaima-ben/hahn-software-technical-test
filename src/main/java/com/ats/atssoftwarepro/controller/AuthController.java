package com.ats.atssoftwarepro.controller;

import com.ats.atssoftwarepro.dto.JwtAuthResponse;
import com.ats.atssoftwarepro.dto.SignInRecord;
import com.ats.atssoftwarepro.dto.SignUpRecord;
import com.ats.atssoftwarepro.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "APIs for User Sign-up and Sign-in")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Register a new user")
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signup(@Valid @RequestBody SignUpRecord request) {
        return ResponseEntity.ok(authService.signUp(request));
    }

    @Operation(summary = "Authenticate a user and get a JWT")
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(@Valid @RequestBody SignInRecord request) {
        return ResponseEntity.ok(authService.signIn(request));
    }

}
