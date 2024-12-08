package com.example.backend.utils.mapper;

import com.example.backend.dto.user.UserResponse;
import com.example.backend.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public final class UserMapper {
    public static UserResponse entityToDto(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getName(), user.getPassword(),
                user.getType(), user.getMail(), user.getPhone(), user.getCity(), user.getDescription(), user.getGender());
    }

    public static List<UserResponse> entityListToDto(List<User> users) {
        return users.stream()
                .map(UserMapper::entityToDto)
                .toList();
    }
}
