package com.example.demo.controllers;

import com.example.demo.config.Credentials;
import com.example.demo.entities.Pet;
import com.example.demo.exceptions.OperationNotAllowed;
import com.example.demo.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/staff")
public class StaffController {
    @Autowired
    StaffService staffService;
    @PostMapping("/addPet")
    public ResponseEntity<String> addPet(@AuthenticationPrincipal Credentials credentials,
                                         @RequestBody Pet pet) throws OperationNotAllowed {
        /// TODO: check whether the credential is in staff or not
        try{
            staffService.savePet(pet);
            return ResponseEntity.status(200).body("Pet has been added");
        }catch (DataAccessException e){
            return ResponseEntity.status(400).body("bad request");
        }

    }
    @PostMapping("/updatePet")
    public ResponseEntity<String> updatePet(@AuthenticationPrincipal Credentials credentials,
                                            @RequestBody Pet pet) throws OperationNotAllowed{
        /// TODO: check whether the credential is in staff or not
        try {

            staffService.updatePet(pet);
            return ResponseEntity.status(200).body("Pet has been updated");
        }catch (DataAccessException e){
            return ResponseEntity.status(400).body("bad request");
        }
    }
    @GetMapping("/getAll")
    public List<Pet> getAllPets(){
        return staffService.getAll();
    }
}