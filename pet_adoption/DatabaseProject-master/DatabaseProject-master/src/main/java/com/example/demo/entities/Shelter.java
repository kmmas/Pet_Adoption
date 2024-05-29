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
public class Shelter {
    private int id;
    private String name;
    private String location;
    private String email;
    private String phone;
    private int managerId;

    public static RowMapper<Shelter> getRowMapper() {
        return (rs, rowNum) -> Shelter.builder()
                                      .id(rs.getInt("id"))
                                      .name(rs.getString("name"))
                                      .location(rs.getString("location"))
                                      .email(rs.getString("email"))
                                      .phone(rs.getString("phone"))
                                      .managerId(rs.getInt("manager_id"))
                                      .build();
    }
}
