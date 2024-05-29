package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.jdbc.core.RowMapper;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {
    private int id;
    private String filename;
    private String path;
    private String type;
    private int petId;

    public static RowMapper<Document> getRowMapper() {
        return (rs, rowNum) -> Document.builder()
                                       .id(rs.getInt("id"))
                                       .filename(rs.getString("filename"))
                                       .path(rs.getString("path"))
                                       .type(rs.getString("type"))
                                       .petId(rs.getInt("pet_id"))
                                       .build();
    }
}
