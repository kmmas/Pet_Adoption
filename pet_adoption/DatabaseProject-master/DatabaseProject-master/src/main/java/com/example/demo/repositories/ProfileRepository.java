package com.example.demo.repositories;

import com.example.demo.entities.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProfileRepository {
    private final JdbcTemplate jdbcTemplate;

    public ProfileRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Profile profile) {
        jdbcTemplate.update("INSERT INTO profile (name, email, phone, id) VALUE (?,?,?,?)",
                            profile.getName(),
                            profile.getEmail(),
                            profile.getPhone(),
                            profile.getId());
    }

    public Profile findById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM profile WHERE id=?", Profile.getRowMapper(),id);
    }

    public void update(Profile profile) {
        jdbcTemplate.update("UPDATE profile SET name=?,email=?,phone=? WHERE id=?",
                            profile.getName(),
                            profile.getEmail(),
                            profile.getPhone(),
                            profile.getId());
    }
}
