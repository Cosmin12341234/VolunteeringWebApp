package com.example.backend.service;

import com.example.backend.dto.user.UserRequest;
import com.example.backend.dto.user.UserResponse;
import com.example.backend.exception.AuthException;
import com.example.backend.model.User;
import com.example.backend.model.enums.Gender;
import com.example.backend.model.enums.Type;
import com.example.backend.repository.UserRepo;
import com.example.backend.utils.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Transactional
    public UserResponse save(UserRequest userRequest) {
        User userToSave = new User(userRequest.username(), userRequest.name(), userRequest.password(), userRequest.type(), userRequest.mail(), userRequest.phone(), userRequest.city(), userRequest.description(), userRequest.gender());
        return UserMapper.entityToDto(userRepo.save(userToSave));
    }

    @Transactional
    public void delete(Long id) {
        User user = findById(id);
        userRepo.delete(user);
    }

    @Transactional
    public UserResponse update(Long id, UserRequest userRequest) {
        User user = findById(id);
        user.setUsername(userRequest.username());
        user.setName(userRequest.name());
        user.setPassword(userRequest.password());
        user.setType(userRequest.type());
        user.setMail(userRequest.mail());
        user.setPhone(userRequest.phone());
        user.setCity(userRequest.city());
        user.setDescription(userRequest.description());
        user.setGender(userRequest.gender());
        return UserMapper.entityToDto(userRepo.save(user));
    }


    public User findById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("User not found with id: " + id));
    }

    public UserResponse findResponseByUsername(String username) {
        return UserMapper.entityToDto(findByUsername(username));
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new AuthException.NotFoundException("User not found with username: " + username));
    }

    public List<UserResponse> getAllUserResponses() {
        List<User> users = userRepo.findAll();
        return UserMapper.entityListToDto(users);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public boolean checkIfUsernameExists(String username) {
        return userRepo.existsByUsername(username);
    }

    public List<UserResponse> getAllUsersByType(Type type) {
        List<User> users = userRepo.findAllByType(type);
        return UserMapper.entityListToDto(users);
    }

    public List<UserResponse> getAllUsersByGender(Gender gender) {
        List<User> users = userRepo.findAllByGender(gender);
        return UserMapper.entityListToDto(users);
    }

    public UserResponse findResponseById(Long userId) {
        return UserMapper.entityToDto(findById(userId));
    }
}
