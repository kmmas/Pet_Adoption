package com.example.demo.services;

import com.example.demo.entities.Shelter;
import com.example.demo.exceptions.OperationNotAllowed;
import com.example.demo.repositories.ShelterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {
    private final ShelterRepository shelterRepository;

    public ManagerService(ShelterRepository shelterRepository) {
        this.shelterRepository = shelterRepository;
    }

    public void createShelter(Shelter shelter) {
        shelterRepository.save(shelter);
    }

    public void deleteShelter(int id, int managerId) throws OperationNotAllowed {
        if (shelterRepository.findById(id).getManagerId() != managerId) {
            throw new OperationNotAllowed("you aren't the manager of this shelter");
        }
        shelterRepository.deleteById(id);
    }

    public List<Shelter> getAllShelter(int managerId) {
        return shelterRepository.findAllByManagerId(managerId);
    }

    public List<Shelter> getAllShelter(int managerId, int offset, int rowCount) {
        return shelterRepository.findAllByManagerId(managerId, offset, rowCount);
    }

    public int getAllShelterCount(int managerId) {
        return shelterRepository.countAllByManagerId(managerId);
    }
}
