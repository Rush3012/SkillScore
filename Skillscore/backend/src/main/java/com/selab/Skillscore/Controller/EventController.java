package com.selab.Skillscore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.service.EventService;
import com.selab.Skillscore.service.FacultyService;
import com.selab.Skillscore.service.FileStorageService;

import org.springframework.http.MediaType;



import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService eventService;
    private final ObjectMapper objectMapper;
    private final FileStorageService fileStorageService;  
    

    public EventController(EventService eventService, FileStorageService fileStorageService, ObjectMapper objectMapper) {
        this.eventService = eventService;
        this.fileStorageService = fileStorageService;  
        this.objectMapper = objectMapper;
    }


    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/find")
    public ResponseEntity<Event> getEventByName(@RequestParam String name) {
        Optional<Event> event = eventService.getEventByName(name);
        return event.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Autowired
    private FacultyService facultyService;
    
    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Event> addEvent(
        @RequestPart("eventData") String eventDataJson,  
        @RequestPart(value = "poster", required = false) MultipartFile poster) {

        try {

            Event event = objectMapper.readValue(eventDataJson, Event.class);

            if (poster != null) {
                String fileName = fileStorageService.saveFile(poster);  
                event.setImage(fileName);
            }

            Faculty faculty = facultyService.getFacultyById(event.getFaculty().getFacultyId());
            if (faculty == null) {
                return ResponseEntity.badRequest().body(null);
            }

            event.setFaculty(faculty);
            Event savedEvent = eventService.saveEvent(event);
            return ResponseEntity.ok(savedEvent);

        } catch (Exception e) {
            e.printStackTrace();  
            return ResponseEntity.badRequest().build();
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }

    @GetMapping("/faculty/{facultyId}")
    public List<Event> getEventsByFaculty(@PathVariable Long facultyId) {
        return eventService.getEventsByFaculty(facultyId);
    }
}
