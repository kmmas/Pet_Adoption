package com.example.demo.repositories;

import com.example.demo.entities.Document;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DocumentRepository {
    private final JdbcTemplate jdbcTemplate;

    public DocumentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Document document) {
        jdbcTemplate.update("INSERT INTO document (filename, path, type, pet_id) VALUE (?,?,?,?)",
                            document.getFilename(),
                            document.getPath(),
                            document.getType(),
                            document.getPetId());
    }

    public void update(Document document) {
        jdbcTemplate.update("UPDATE document SET filename=?,path=?,type=?,pet_id=? WHERE id=?",
                            document.getFilename(),
                            document.getPath(),
                            document.getType(),
                            document.getPetId(),
                            document.getId());
    }

    public void deleteById(int id) {
        jdbcTemplate.update("DELETE FROM document WHERE id=?", id);
    }

    public Document findById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM document WHERE id=?", Document.getRowMapper(), id);
    }

    public List<Document> findByPetId(int petId) {
        return jdbcTemplate.query("SELECT * FROM document WHERE pet_id=?", Document.getRowMapper(), petId);
    }

    public List<Document> findByPetId(int petId, int offset, int rowCount) {
        return jdbcTemplate.query("SELECT * FROM document WHERE pet_id=? LIMIT ?,?",
                                  Document.getRowMapper(),
                                  petId,
                                  offset,
                                  rowCount);
    }
}
