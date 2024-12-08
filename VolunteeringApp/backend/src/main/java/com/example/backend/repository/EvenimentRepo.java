package com.example.backend.repository;

import com.example.backend.model.Eveniment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EvenimentRepo extends JpaRepository<Eveniment, Long> {
    Optional<Eveniment> findByName(String name);
    List<Eveniment> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
}