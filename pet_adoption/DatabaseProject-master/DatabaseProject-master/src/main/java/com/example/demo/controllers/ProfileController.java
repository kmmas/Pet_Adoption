package com.example.demo.controllers;

import com.example.demo.config.Credentials;
import com.example.demo.entities.Profile;
import com.example.demo.repositories.ProfileRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ProfileController {
    private final ProfileRepository profileRepository;

    public ProfileController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping("/profile")
    public Profile getProfile(@AuthenticationPrincipal Credentials credentials) {
        return profileRepository.findById(credentials.getId());
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<Object> getProfile(@PathVariable int id) {
        try {
            return ResponseEntity.ok(profileRepository.findById(id));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(400).body("no such user exist");
        }
    }

    @PostMapping("/editProfile")
    public ResponseEntity<Object> editProfile(@AuthenticationPrincipal Credentials credentials,
                                              @RequestBody Profile profile) {
        try {
            profile.setId(credentials.getId());
            profileRepository.update(profile);
            return ResponseEntity.status(201).body(profile);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("error when updated");
        }
    }
}
