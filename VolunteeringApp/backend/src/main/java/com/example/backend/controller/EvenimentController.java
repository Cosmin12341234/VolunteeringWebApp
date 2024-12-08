package com.example.backend.controller;

import com.example.backend.dto.eveniment.EvenimentRequest;
import com.example.backend.dto.eveniment.EvenimentResponse;
import com.example.backend.dto.ResponseDto;
import com.example.backend.service.EvenimentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/events")
@Validated
public class EvenimentController {

    private final EvenimentService evenimentService;

    public EvenimentController(EvenimentService evenimentService) {
        this.evenimentService = evenimentService;
    }

    @Operation(summary = "Create a new event", description = "This endpoint is used to create a new event. " +
            "The details of the event to be created are passed in the request body. " +
            "The response body contains the details of the created event.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Event created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = EvenimentResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<EvenimentResponse> createEvent(@Valid @RequestBody EvenimentRequest evenimentRequest) {
        EvenimentResponse createdEvent = evenimentService.save(evenimentRequest);
        return ResponseEntity.ok(createdEvent);
    }

    @Operation(summary = "Delete an event", description = "This endpoint is used to delete an event by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Event deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Event not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        evenimentService.delete(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update an event", description = "This endpoint is used to update an event by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Event updated successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = EvenimentResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Event not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PutMapping("/{id}")
    public ResponseEntity<EvenimentResponse> updateEvent(@PathVariable Long id, @Valid @RequestBody EvenimentRequest evenimentRequest) {
        EvenimentResponse updatedEvent = evenimentService.update(id, evenimentRequest);
        return ResponseEntity.ok(updatedEvent);
    }

    @Operation(summary = "Get all events", description = "This endpoint is used to retrieve all events.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Events retrieved successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EvenimentResponse.class)))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<EvenimentResponse>> getAllEvents() {
        List<EvenimentResponse> events = evenimentService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @Operation(summary = "Get event by name", description = "This endpoint is used to retrieve an event by its name.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Event retrieved successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = EvenimentResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Event not found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/byName/{name}")
    public ResponseEntity<EvenimentResponse> getEventByName(@PathVariable String name) {
        EvenimentResponse event = evenimentService.findEventByName(name);
        return ResponseEntity.ok(event);
    }

    @Operation(summary = "Get events by date range", description = "This endpoint is used to retrieve events within a specified date range.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Events retrieved successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EvenimentResponse.class)))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/byDateRange")
    public ResponseEntity<List<EvenimentResponse>> getEventsByDateRange(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        List<EvenimentResponse> events = evenimentService.findEventsByDateRange(startDate, endDate);
        return ResponseEntity.ok(events);
    }
}