package com.example.backend.dto.eveniment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record EvenimentRequest(
        @Schema(description = "The name of the event(required)")
        @NotBlank(message = "Name is mandatory")
        @Size(min = 3, max = 64, message = "Name must be between 3 and 64 characters")
        String name,

        @Schema(description = "The description of the event(required)")
        @NotBlank(message = "Description is mandatory")
        @Size(min = 3, max = 64, message = "Description must be between 3 and 255 characters")
        String description,

        @Schema(description = "The start date of the event(required)")
        @NotBlank(message = "Start date is mandatory")
        LocalDate startDate,

        @Schema(description = "The end date of the event(required)")
        @NotBlank(message = "End date is mandatory")
        LocalDate endDate,

        @Schema(description = "The location of the event(required)")
        @NotBlank(message = "Location is mandatory")
        @Size(min = 3, max = 64, message = "Location must be between 3 and 64 characters")
        String location
) {

    public EvenimentRequest(String name, String description, LocalDate startDate, LocalDate endDate, String location) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
    }
}