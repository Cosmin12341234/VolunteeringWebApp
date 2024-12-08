package com.example.backend.service;

import com.example.backend.dto.eveniment.EvenimentRequest;
import com.example.backend.dto.eveniment.EvenimentResponse;
import com.example.backend.exception.AuthException;
import com.example.backend.repository.EvenimentRepo;
import com.example.backend.utils.mapper.EvenimentMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.Eveniment;

import java.time.LocalDate;
import java.util.List;

@Service
public class EvenimentService {

    @Autowired
    private final EvenimentRepo evenimentRepository;

    public EvenimentService(EvenimentRepo evenimentRepository) {
        this.evenimentRepository = evenimentRepository;
    }

    @Transactional
    public EvenimentResponse save(EvenimentRequest evenimentRequest) {
        Eveniment evenimentToSave = new Eveniment(evenimentRequest.name(), evenimentRequest.description(), evenimentRequest.startDate(), evenimentRequest.endDate(), evenimentRequest.location());
        return EvenimentMapper.entityToDto(evenimentRepository.save(evenimentToSave));
    }

    @Transactional
    public void delete(Long id) {
        Eveniment eveniment = findById(id);
        evenimentRepository.delete(eveniment);
    }

    @Transactional
    public Eveniment findById(Long id) {
        return evenimentRepository.findById(id).orElseThrow(() -> new AuthException.NotFoundException("Event not found with id: " + id));
    }

    @Transactional
    public EvenimentResponse update(Long id, EvenimentRequest evenimentRequest) {
        Eveniment eveniment = findById(id);
        eveniment.setName(evenimentRequest.name());
        eveniment.setDescription(evenimentRequest.description());
        eveniment.setStartDate(evenimentRequest.startDate());
        eveniment.setEndDate(evenimentRequest.endDate());
        eveniment.setLocation(evenimentRequest.location());
        return EvenimentMapper.entityToDto(evenimentRepository.save(eveniment));
    }

    public List<EvenimentResponse> getAllEvents() {
        List<Eveniment> events = evenimentRepository.findAll();
        return EvenimentMapper.evenimentResponseList(events);
    }

    public EvenimentResponse findEventByName(String name) {
        Eveniment event = evenimentRepository.findByName(name)
                .orElseThrow(() -> new AuthException.NotFoundException("Event not found with name: " + name));
        return EvenimentMapper.entityToDto(event);
    }

    public List<EvenimentResponse> findEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        List<Eveniment> events = evenimentRepository.findByStartDateBetween(startDate, endDate);
        return EvenimentMapper.evenimentResponseList(events);
    }
}