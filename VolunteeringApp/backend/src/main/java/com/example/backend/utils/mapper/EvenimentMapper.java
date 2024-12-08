package com.example.backend.utils.mapper;

import com.example.backend.dto.eveniment.EvenimentResponse;
import com.example.backend.model.Eveniment;
import com.example.backend.model.User;
import com.example.backend.utils.mapper.UserMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public final class EvenimentMapper {

    public static EvenimentResponse entityToDto(Eveniment eveniment) {
        return new EvenimentResponse(
                eveniment.getId(),
                eveniment.getName(),
                eveniment.getDescription(),
                eveniment.getStartDate(),
                eveniment.getEndDate(),
                eveniment.getLocation(),
                eveniment.getUsers() != null ?
                UserMapper.entityListToDto(eveniment.getUsers()):null
        );
    }

    public static List<EvenimentResponse> evenimentResponseList(List<Eveniment> evenimentList) {
        return evenimentList.stream()
                .map(EvenimentMapper::entityToDto)
                .toList();
    }
}