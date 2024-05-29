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
public class Profile {
    private int id;
    private String name;
    private String email;
    private String phone;

    public static RowMapper<Profile> getRowMapper() {
        return (rs, rowNum) -> Profile.builder()
                                      .id(rs.getInt("id"))
                                      .name(rs.getString("name"))
                                      .email(rs.getString("email"))
                                      .phone(rs.getString("phone"))
                                      .build();
    }
}
