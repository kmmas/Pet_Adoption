package com.example.demo.controllers;

import com.example.demo.dtos.LoginDto;
import com.example.demo.dtos.RegisterDto;
import com.example.demo.services.RegisterService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
public class AuthorizationController {

    private final RegisterService registerService;
    private final AuthenticationManager authenticationManager;

    public AuthorizationController(RegisterService registerService, AuthenticationManager authenticationManager) {
        this.registerService = registerService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto loginDto) {
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(loginDto.getUsername(),
                                                                    loginDto.getPassword());
        try {
            List<String> tmp = authenticationManager.authenticate(authenticationRequest)
                                                    .getAuthorities()
                                                    .stream()
                                                    .map(GrantedAuthority::getAuthority)
                                                    .toList();
            return ResponseEntity.status(200).body(tmp);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("the email or password is wrong");
        } catch (LockedException e) {
            return ResponseEntity.status(401).body("the account is locked, contact the admin");
        } catch (DisabledException e) {
            return ResponseEntity.status(401).body("the account is disabled, contact the admin");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (!Objects.equals(registerDto.getRole(), "STAFF")
            && !Objects.equals(registerDto.getRole(), "MANAGER")
            && !Objects.equals(registerDto.getRole(), "USER")) {
            return ResponseEntity.status(400).body("not a valid role");
        }
        try {
            registerService.registerUser(registerDto);
        } catch (DataAccessException e) {
            return ResponseEntity.status(409).body("username is already taken");
        }
        return ResponseEntity.status(201).body("user registered successfully");
    }
}
