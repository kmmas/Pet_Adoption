package com.example.demo.services;

import com.example.demo.entities.Pet;
import com.example.demo.exceptions.OperationNotAllowed;
import com.example.demo.repositories.PetRepository;
import com.example.demo.repositories.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {
    @Autowired
    PetRepository petRepository;
    @Autowired
    ShelterRepository shelterRepository;
    public void savePet(Pet pet) throws OperationNotAllowed {
        if(shelterRepository.findById(pet.getShelterId())==null){
            throw new OperationNotAllowed("this shelter doesn't exists");
        }
        petRepository.save(pet);
    }
    public void updatePet(Pet pet) throws OperationNotAllowed {
        if(shelterRepository.findById(pet.getShelterId())==null){
            throw new OperationNotAllowed("this shelter doesn't exists");
        }
        petRepository.update(pet);
    }
    public List<Pet> getAll(){
        return petRepository.getAdoptablePets();
    }
}