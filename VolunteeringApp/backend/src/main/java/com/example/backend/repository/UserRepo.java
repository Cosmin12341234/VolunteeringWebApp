package com.example.backend.repository;

import com.example.backend.model.User;
import com.example.backend.model.enums.Gender;
import com.example.backend.model.enums.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    List<User> findAllByType(Type type);

    boolean existsByUsername(String username);

    List<User> findAllByGender(Gender gender);
}
