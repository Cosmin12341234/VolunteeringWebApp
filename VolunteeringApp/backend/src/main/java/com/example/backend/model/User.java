package com.example.backend.model;

import com.example.backend.model.enums.Gender;
import com.example.backend.model.enums.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the user")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "The username of the user")
    private String username;

    @Column(nullable = false, length = 64)
    @Schema(description = "The name of the user")
    private String name;

    @Column(nullable = false, length = 64)
    @Schema(description = "The password of the user")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The type of the user")
    private Type type;

    @Column(nullable = false, length = 64)
    @Schema(description = "The mail of the user")
    private String mail;

    @Column(nullable = false, length = 64)
    @Schema(description = "The phone of the user")
    private String phone;

    @Column(nullable = false, length = 64)
    @Schema(description = "The city of the user")
    private String city;

    @Column(nullable = false, length = 64)
    @Schema(description = "The description of the user")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The gender of the user")
    private Gender gender;

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_events",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "event_id")}
    )
    @Schema(description = "The events of the user")
    private List<Eveniment> events;

    public User(String username, String name, String password, Type type, String mail, String phone, String city, String description, Gender gender) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.type = type;
        this.mail = mail;
        this.phone = phone;
        this.city = city;
        this.description = description;
        this.gender = gender;
    }

}
