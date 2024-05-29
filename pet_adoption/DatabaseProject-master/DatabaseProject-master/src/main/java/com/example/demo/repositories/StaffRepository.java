package com.example.demo.repositories;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class StaffRepository {
    private final JdbcTemplate jdbcTemplate;

    public StaffRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(int id, int shelterId) {
        jdbcTemplate.update("INSERT INTO staff (id, shelter_id) VALUE (?,?)", id, shelterId);
    }

    public void update(int id, int newShelterId) {
        jdbcTemplate.update("UPDATE staff SET shelter_id=? WHERE id =?", newShelterId, id);
    }
}
