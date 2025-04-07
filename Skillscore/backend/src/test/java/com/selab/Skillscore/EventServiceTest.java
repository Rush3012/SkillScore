package com.selab.Skillscore;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.repository.EventRepository;
import com.selab.Skillscore.service.EventService;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventService eventService;

    private Event testEvent;
    private Faculty testFaculty;

    @BeforeEach
    void setUp() {
        testFaculty = new Faculty();
        testFaculty.setFacultyId(1L);
        testFaculty.setName("Dr. Smith");
        testFaculty.setDepartment("CSE");

        testEvent = new Event(
            "Tech Fest",
            "Annual technical festival",
            50,
            LocalDate.now(),
            LocalDate.now().plusDays(3),
            LocalTime.of(10, 0),
            "poster.jpg",
            "https://register.com",
            testFaculty
        );
        testEvent.setId(1L);
    }

    @Test
    void getAllEvents_ReturnsAllEvents() {
        when(eventRepository.findAll()).thenReturn(List.of(testEvent));
        List<Event> events = eventService.getAllEvents();
        assertEquals(1, events.size());
        assertEquals("Tech Fest", events.get(0).getName());
    }

    @Test
    void getEventByName_WhenExists_ReturnsEvent() {
        when(eventRepository.findByName("Tech Fest")).thenReturn(Optional.of(testEvent));
        Optional<Event> foundEvent = eventService.getEventByName("Tech Fest");
        assertTrue(foundEvent.isPresent());
        assertEquals(50, foundEvent.get().getPoints());
    }

    @Test
    void getEventByName_WhenNotExists_ReturnsEmpty() {
        when(eventRepository.findByName("Unknown")).thenReturn(Optional.empty());
        Optional<Event> foundEvent = eventService.getEventByName("Unknown");
        assertTrue(foundEvent.isEmpty());
    }

    @Test
    void saveEvent_ReturnsSavedEvent() {
        when(eventRepository.save(any(Event.class))).thenReturn(testEvent);
        Event savedEvent = eventService.saveEvent(testEvent);
        assertNotNull(savedEvent);
        assertEquals(1L, savedEvent.getId());
    }

    @Test
    void getEventById_WhenExists_ReturnsEvent() {
        when(eventRepository.findById(1L)).thenReturn(Optional.of(testEvent));
        Event foundEvent = eventService.getEventById(1L);
        assertNotNull(foundEvent);
        assertEquals("Tech Fest", foundEvent.getName());
    }

    @Test
    void getEventById_WhenNotExists_ReturnsNull() {
        when(eventRepository.findById(999L)).thenReturn(Optional.empty());
        Event foundEvent = eventService.getEventById(999L);
        assertNull(foundEvent);
    }

    @Test
    void getEventsByFaculty_ReturnsFilteredEvents() {
        when(eventRepository.findByFaculty_FacultyId(1L)).thenReturn(List.of(testEvent));
        List<Event> events = eventService.getEventsByFaculty(1L);
        assertEquals(1, events.size());
        assertEquals("CSE", events.get(0).getFaculty().getDepartment());
    }
}