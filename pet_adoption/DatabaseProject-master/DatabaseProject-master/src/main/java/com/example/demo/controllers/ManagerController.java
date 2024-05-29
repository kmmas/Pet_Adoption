package com.example.demo.controllers;

import com.example.demo.config.Credentials;
import com.example.demo.entities.Shelter;
import com.example.demo.exceptions.OperationNotAllowed;
import com.example.demo.services.ManagerService;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/manager")
public class ManagerController {
    private final ManagerService managerService;

    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @PostMapping("/createShelter")
    public ResponseEntity<String> createShelter(@AuthenticationPrincipal Credentials credentials,
                                                @RequestBody Shelter shelter) {
        try {
            shelter.setManagerId(credentials.getId());
            managerService.createShelter(shelter);
            return ResponseEntity.status(201).body("shelter created successfully");
        } catch (DataAccessException e) {
            return ResponseEntity.status(400).body("bad request");
        }
    }

    @GetMapping("/getAllShelter")
    public List<Shelter> getAllShelter(@AuthenticationPrincipal Credentials credentials) {
        return managerService.getAllShelter(credentials.getId());
    }

    @GetMapping("/getAllShelter/{offset}/{rowCount}")
    public List<Shelter> getAllShelter(@AuthenticationPrincipal Credentials credentials,
                                       @PathVariable int offset,
                                       @PathVariable int rowCount) {
        return managerService.getAllShelter(credentials.getId(), offset, rowCount);
    }

    @GetMapping("/getAllSheltersCount")
    public int getAllSheltersCount(@AuthenticationPrincipal Credentials credentials) {
        return managerService.getAllShelterCount(credentials.getId());
    }

    @DeleteMapping("/deleteShelter/{id}")
    public ResponseEntity<String> deleteShelter(@AuthenticationPrincipal Credentials credentials,
                                                @PathVariable int id) {
        try {
            managerService.deleteShelter(id, credentials.getId());
            return ResponseEntity.ok("shelter was deleted successfully");
        } catch (OperationNotAllowed e) {
            return ResponseEntity.status(403).body(e.getMessage());
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(400).body("no such shelter exist");
        }
    }
}
