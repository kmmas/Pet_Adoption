package com.example.demo.repositories;

import com.example.demo.entities.Pet;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PetRepository {
    private final JdbcTemplate jdbcTemplate;

    public PetRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Pet findById(int id){
        return jdbcTemplate.queryForObject("SELECT * FROM pet WHERE id=?",Pet.getRowMapper(),id);
    }
    public void save(Pet pet) {
        jdbcTemplate.update("INSERT INTO pet (name, age, gender, breed, health_status, image, is_adopted, shelter_id, "
                        + "description, behavior) VALUE (?,?,?,?,?,?,?,?,?,?)",
                pet.getName(),
                pet.getAge(),
                pet.getGender(),
                pet.getBreed(),
                pet.getHealthStatus(),
                pet.getImage(),
                pet.isAdopted(),
                pet.getShelterId(),
                pet.getDescription(),
                pet.getBehavior());
    }

    public void update(Pet pet) {
        jdbcTemplate.update(
                "UPDATE pet SET name=?,age=?,gender=?,breed=?,health_status=?,image=?,is_adopted=?,shelter_id=?,"
                        + "description=?,behavior=? WHERE id = ?",
                pet.getName(),
                pet.getAge(),
                pet.getGender(),
                pet.getBreed(),
                pet.getHealthStatus(),
                pet.getImage(),
                pet.isAdopted(),
                pet.getShelterId(),
                pet.getDescription(),
                pet.getBehavior(),
                pet.getId());
    }
    public List<Pet> getAdoptablePets(){
        return jdbcTemplate.query("SELECT * FROM PET",Pet.getRowMapper());
    }
}