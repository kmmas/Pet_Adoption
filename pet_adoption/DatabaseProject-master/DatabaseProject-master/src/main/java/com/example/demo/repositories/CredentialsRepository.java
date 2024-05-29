package com.example.demo.repositories;

import com.example.demo.config.Credentials;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Repository
public class CredentialsRepository {
    private final JdbcTemplate jdbcTemplate;

    public CredentialsRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<String> getRole(int id) {
        return jdbcTemplate.queryForList("SELECT role.role FROM role WHERE credentials_id=?", String.class, id);
    }

    public Credentials findById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM credentials WHERE id=?", Credentials.getRowMapper(), id);
    }

    public Credentials findByUsername(String username) {
        try {
            Credentials credentials = jdbcTemplate.queryForObject("SELECT * FROM credentials WHERE username=?",
                                                                  Credentials.getRowMapper(),
                                                                  username);
            assert credentials != null;
            credentials.setRoles(getRole(credentials.getId()));
            return credentials;
        } catch (EmptyResultDataAccessException e) {
            throw new UsernameNotFoundException("no user with that name");
        }
    }

    public int save(String username, String password, String role) {
        KeyHolder key = new GeneratedKeyHolder();
        jdbcTemplate.update((con -> {
            String sql = "INSERT INTO credentials (username, password) VALUE (?,?)";
            PreparedStatement statement = con.prepareStatement(sql, new String[]{"id"});
            statement.setString(1, username);
            statement.setString(2, password);
            return statement;
        }), key);
        int id = Objects.requireNonNull(key.getKey()).intValue();
        saveUserRole(id, role);
        return id;
    }

    public void saveUserRole(int id, String role) {
        jdbcTemplate.update("INSERT INTO role (role, credentials_id) VALUE (?,?)", role, id);
    }

    public void saveUserMultipleRoles(int id, String... role) {
        List<Object[]> parameters = Arrays.stream(role).map((r) -> new Object[]{r, id}).toList();
        jdbcTemplate.batchUpdate("INSERT INTO role (role, credentials_id) VALUE (?,?)", parameters);
    }

    public void update(Credentials credentials) {
        jdbcTemplate.update("UPDATE credentials SET username=?,password=? WHERE id=?",
                            credentials.getUsername(),
                            credentials.getPassword(),
                            credentials.getId());
    }
}
