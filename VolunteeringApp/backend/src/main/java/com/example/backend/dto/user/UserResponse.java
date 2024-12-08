package com.example.backend.dto.user;

import com.example.backend.model.enums.Gender;
import com.example.backend.model.enums.Type;
import io.swagger.v3.oas.annotations.media.Schema;

public record UserResponse(
        @Schema(description = "The id of the user")
        Long id,
        @Schema(description = "The username of the user")
        String username,
        @Schema(description = "The name of the user")
        String name,
        @Schema(description = "The password of the user")
        String password,
        @Schema(description = "The type of the user")
        Type type,

        @Schema(description = "The mail of the user")
        String mail,

        @Schema(description = "The phone of the user")
        String phone,

        @Schema(description = "The city of the user")
        String city,

        @Schema(description = "The description of the user")
        String description,
        @Schema(description = "The gender of the user")
        Gender gender


) {
    public UserResponse(Long id, String username, String name, String password, Type type, String mail, String phone, String city, String description, Gender gender) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.type = type;
        this.gender = gender;
        this.mail = mail;
        this.phone = phone;
        this.city = city;
        this.description = description;
    }
}
