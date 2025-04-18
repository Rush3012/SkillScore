package com.selab.Skillscore.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.repository.EventRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;

    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Find event by name
    public Optional<Event> getEventByName(String name) {
        return eventRepository.findByName(name);
    }

    // Save event
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
    
    public List<Event> getEventsByFaculty(Long facultyId) {
        return eventRepository.findByFaculty_FacultyId(facultyId);
    }
}
