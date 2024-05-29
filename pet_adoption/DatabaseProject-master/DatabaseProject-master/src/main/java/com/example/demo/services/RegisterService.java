package com.example.demo.services;

import com.example.demo.dtos.RegisterDto;
import com.example.demo.entities.Profile;
import com.example.demo.repositories.CredentialsRepository;
import com.example.demo.repositories.ProfileRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final CredentialsRepository credentialsRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterService(CredentialsRepository credentialsRepository,
                           ProfileRepository profileRepository,
                           PasswordEncoder passwordEncoder) {
        this.credentialsRepository = credentialsRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(RegisterDto registerDto) {
        int id = credentialsRepository.save(registerDto.getUsername(),
                                            passwordEncoder.encode(registerDto.getPassword()),
                                            registerDto.getRole());
        profileRepository.save(Profile.builder()
                                      .name(registerDto.getName())
                                      .phone(registerDto.getPhone())
                                      .email(registerDto.getEmail())
                                      .id(id)
                                      .build());
    }
}
