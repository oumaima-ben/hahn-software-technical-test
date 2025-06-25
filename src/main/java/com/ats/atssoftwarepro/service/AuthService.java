package com.ats.atssoftwarepro.service;

import com.ats.atssoftwarepro.dto.JwtAuthResponse;
import com.ats.atssoftwarepro.dto.SignInRecord;
import com.ats.atssoftwarepro.dto.SignUpRecord;

public interface AuthService {
    JwtAuthResponse signUp(SignUpRecord request);
    JwtAuthResponse signIn(SignInRecord  request);
}
