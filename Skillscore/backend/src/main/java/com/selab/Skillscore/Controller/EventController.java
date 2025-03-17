package com.selab.Skillscore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.service.EventService;
import com.selab.Skillscore.service.FacultyService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    // Get all events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    // Find event by name
    @GetMapping("/find")
    public ResponseEntity<Event> getEventByName(@RequestParam String name) {
        Optional<Event> event = eventService.getEventByName(name);
        return event.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Autowired
    private FacultyService facultyService;
    
    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {
        try {
            if (event.getFaculty() == null || event.getFaculty().getId() == null) {
                return ResponseEntity.badRequest().body(null);
            }
    
            Faculty faculty = facultyService.getFacultyById(event.getFaculty().getId());
            if (faculty == null) {
                return ResponseEntity.badRequest().body(null);
            }
    
            event.setFaculty(faculty);
            Event savedEvent = eventService.saveEvent(event);
            return ResponseEntity.ok(savedEvent);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }
}
