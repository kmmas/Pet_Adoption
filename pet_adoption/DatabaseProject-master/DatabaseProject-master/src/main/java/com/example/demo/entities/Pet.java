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
public class Pet {
    private int id;
    private String name;
    private short age;
    private String healthStatus;
    private String image;
    private String gender;
    private String breed;
    private boolean adopted;
    private int shelterId;
    private String description;
    private String behavior;

    public static RowMapper<Pet> getRowMapper() {
        return (rs, rowNum) -> Pet.builder()
                                  .id(rs.getInt("id"))
                                  .name(rs.getString("name"))
                                  .age(rs.getShort("age"))
                                  .gender(rs.getString("gender"))
                                  .breed(rs.getString("breed"))
                                  .healthStatus(rs.getString("health_status"))
                                  .behavior(rs.getString("behavior"))
                                  .adopted(rs.getBoolean("is_adopted"))
                                  .shelterId(rs.getInt("shelter_id"))
                                  .description(rs.getString("description"))
                                  .image(rs.getString("image"))
                                  .build();
    }
}
