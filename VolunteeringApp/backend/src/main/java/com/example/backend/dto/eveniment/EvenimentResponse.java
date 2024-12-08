package com.example.backend.dto.eveniment;

import com.example.backend.dto.user.UserResponse;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.List;

public record EvenimentResponse(
        @Schema(description = "This is the id of the event")
        Long id,

        @Schema(description = "The name of the event")
        String name,

        @Schema(description = "The description of the event")
        String description,

        @Schema(description = "The start date of the event")
        LocalDate startDate,

        @Schema(description = "The end date of the event")
        LocalDate endDate,

        @Schema(description = "The location of the event")
        String location,

        @Schema(description = "The list of users that are going to the event")
        List<UserResponse> users

) {
    public EvenimentResponse(Long id, String name, String description, LocalDate startDate, LocalDate endDate, String location, List<UserResponse> users) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.users = users;
    }
}