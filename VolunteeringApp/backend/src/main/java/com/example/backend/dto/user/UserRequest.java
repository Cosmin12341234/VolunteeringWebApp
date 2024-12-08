package com.example.backend.dto.user;

import com.example.backend.model.enums.Gender;
import com.example.backend.model.enums.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(
        @Schema(description = "The username of the user (required)")
        @NotBlank(message = "Username cannot be blank")
        @Size(min = 3, max = 64, message = "Username must be between 3 and 64 characters")
        String username,
        @Schema(description = "The name of the user (required)")
        @NotBlank(message = "Name cannot be blank")
        @Size(min = 3, max = 64, message = "Name must be between 3 and 64 characters")
        String name,
        @Schema(description = "The password of the user (required)")
        @NotBlank(message = "Password cannot be blank")
        @Size(min = 3, max = 64, message = "Password must be between 3 and 64 characters")
        String password,
        @Schema(description = "The type of the user(required)", allowableValues = {"ADMIN", "VOLUNTEER"})
        Type type,

        @Schema(description = "The mail of the user (required)")
        @NotBlank(message = "Mail cannot be blank")
        @Size(min = 3, max = 64, message = "Mail must be between 3 and 64 characters")
        String mail,

        @Schema(description = "The phone of the user (required)")
        @NotBlank(message = "Phone cannot be blank")
        @Size(min = 3, max = 64, message = "Phone must be between 3 and 64 characters")

        String phone,

        @Schema(description = "The city of the user (required)")
        @NotBlank(message = "City cannot be blank")
        @Size(min = 3, max = 64, message = "City must be between 3 and 64 characters")

        String city,

        @Schema(description = "The description of the user (required)")
        @NotBlank(message = "Desscription cannot be blank")
        @Size(min = 3, max = 64, message = "Description must be between 3 and 64 characters")
        String description,

        @Schema(description = "The gender of the user(required)", allowableValues = {"MALE", "FEMALE"})
        Gender gender
) {
    public UserRequest(String username, String name, String password, Type type, String mail, String phone, String city, String description, Gender gender) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.type = type;
        this.gender = gender;
        this.mail = mail;
        this.phone = phone;
        this.description = description;
        this.city = city;

    }
}
