package com.ats.atssoftwarepro.service;

import com.ats.atssoftwarepro.dto.JwtAuthResponse;
import com.ats.atssoftwarepro.dto.SignInRecord;
import com.ats.atssoftwarepro.dto.SignUpRecord;
import com.ats.atssoftwarepro.entity.User;
import com.ats.atssoftwarepro.entity.enums.Role;
import com.ats.atssoftwarepro.exceptions.AppException;
import com.ats.atssoftwarepro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthResponse signUp(SignUpRecord request) {
        if(userRepository.findByEmail(request.email()).isPresent()){
            throw new AppException("Email address already in use.", HttpStatus.BAD_REQUEST);
        }
        var user = new User();
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER); // Default role
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return new JwtAuthResponse(jwt);
    }

    @Override
    public JwtAuthResponse signIn(SignInRecord request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new AppException("Invalid email or password.", HttpStatus.UNAUTHORIZED));
        var jwt = jwtService.generateToken(user);
        return new JwtAuthResponse(jwt);
    }
}
