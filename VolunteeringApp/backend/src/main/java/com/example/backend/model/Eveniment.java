package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "app_eveniment")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Eveniment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the event")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "The name of the event")
    private String name;

    @Column(nullable = false, length = 255)
    @Schema(description = "The description of the event")
    private String description;

    @Column(nullable = false)
    @Schema(description = "The start date of the event")
    private LocalDate startDate;

    @Column(nullable = false)
    @Schema(description = "The end date of the event")
    private LocalDate endDate;

    @Column(nullable = false, length = 64)
    @Schema(description = "The location of the event")
    private String location;

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_events",
            joinColumns = {@JoinColumn(name = "event_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    @Schema(description = "The users that are going to the event")
    private List<User> users;

    public Eveniment(String name, String description, LocalDate startDate, LocalDate endDate, String location) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
    }
}