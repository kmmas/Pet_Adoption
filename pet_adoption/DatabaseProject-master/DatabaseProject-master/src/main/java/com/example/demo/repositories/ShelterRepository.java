package com.example.demo.repositories;

import com.example.demo.entities.Shelter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ShelterRepository {
    private final JdbcTemplate jdbcTemplate;

    public ShelterRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Shelter shelter) {
        jdbcTemplate.update("INSERT INTO shelter (name, location, email, phone, manager_id) VALUE (?,?,?,?,?)",
                            shelter.getName(),
                            shelter.getLocation(),
                            shelter.getEmail(),
                            shelter.getPhone(),
                            shelter.getManagerId());
    }

    public void update(Shelter shelter) {
        jdbcTemplate.update("UPDATE shelter SET name=?,location=?,email=?,phone=?,manager_id=? WHERE id=?",
                            shelter.getName(),
                            shelter.getLocation(),
                            shelter.getEmail(),
                            shelter.getPhone(),
                            shelter.getManagerId(),
                            shelter.getId());
    }

    public void deleteById(int id) {
        jdbcTemplate.update("DELETE FROM shelter WHERE id=?", id);
    }

    public Shelter findById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM shelter WHERE id=?", Shelter.getRowMapper(), id);
    }

    public List<Shelter> findAllByManagerId(int managerId, int offset, int rowCount) {
        return jdbcTemplate.query("SELECT * FROM shelter WHERE manager_id=? LIMIT ?,?",
                                  Shelter.getRowMapper(),
                                  managerId,
                                  offset,
                                  rowCount);
    }

    public List<Shelter> findAllByManagerId(int managerId) {
        return jdbcTemplate.query("SELECT * FROM shelter WHERE manager_id=?", Shelter.getRowMapper(), managerId);
    }

    public int countAllByManagerId(int managerId) {
        Integer result = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM shelter WHERE manager_id=?",
                                                Integer.class,
                                                managerId);
        return result != null ? result : 0;
    }
}
