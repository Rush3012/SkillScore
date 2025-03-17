package com.selab.Skillscore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.dto.RequestDTO;
import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.repository.EventRepository;
import com.selab.Skillscore.repository.RequestRepository;
import com.selab.Skillscore.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class RequestService {
    
    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EventRepository eventRepository;

    // public Request submitRequest(Long studentId, Long eventId, Request request) {
    //     Student student = studentRepository.findByUserId(studentId)
    //             .orElseThrow(() -> new RuntimeException("Student not found"));

    //     request.setStudent(student);
    //     request.setFacultyAdvisor(student.getFaculty());  // Auto-fill Faculty Advisor

    //     if (eventId != null) {
    //         Event event = eventRepository.findById(eventId)
    //                 .orElseThrow(() -> new RuntimeException("Event not found"));
    //         request.setEvent(event);
    //         request.setEventName(event.getName());
    //         request.setFacultyName(event.getFaculty().getName());
    //         request.setPoints(event.getPoints());
    //         request.setDate(event.getStartDate());
    //         request.setTime(event.getTime());
    //     }

    //     return requestRepository.save(request);
    // }

    @Transactional
public void submitRequest(String studentId, Long eventId, Request request) {
    Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    if (student.getFaculty() == null) {
        throw new RuntimeException("Student does not have an assigned faculty advisor.");
    }

    request.setStudent(student);
    request.setFacultyAdvisor(student.getFaculty());

    if (eventId != null) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        request.setEvent(event);
        request.setEventName(event.getName());
        request.setFacultyName(event.getFaculty().getName());
        request.setPoints(event.getPoints());
        request.setDate(event.getStartDate());
        request.setTime(event.getTime());
    } else {
        if (request.getEventName() == null || request.getEventName().isBlank()) {
            throw new RuntimeException("Event name must be provided.");
        }
    }

    request.setStatus("Pending");

    requestRepository.save(request);
}


    public List<Request> getPendingRequestsForFaculty(Long facultyId) {
        return requestRepository.findByFacultyAdvisor_FacultyIdAndStatus(facultyId, "Pending");
    }
    
    public List<Request> getPendingRequestsForFacultyAdvisor(Long facultyId) {
        return requestRepository.findByFacultyAdvisor_FacultyIdAndStatus(facultyId, "Pending");
    }
    
}



// @Service
// public class RequestService {
    
//     @Autowired
//     private RequestRepository requestRepository;

//     @Autowired
//     private EventRepository eventRepository;

//     @Autowired
//     private StudentRepository studentRepository;

//     public void submitRequest(Long studentId, RequestDTO requestDTO) {
//         // Fetch event from DB
//         Event event = eventRepository.findById(requestDTO.getEventId())
//                 .orElseThrow(() -> new RuntimeException("Event not found"));

//         // Fetch student from DB
//         Student student = studentRepository.findByUserId(studentId)
//                 .orElseThrow(() -> new RuntimeException("Student not found"));

//         // Create new request entity
//         Request request = new Request();
//         request.setEvent(event);
//         request.setDescription(requestDTO.getDescription());
//         request.setStudent(student);  // Assuming a student field exists in `Request`

//         requestRepository.save(request);
//     }
// }
