
package com.selab.Skillscore.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.model.RequestApproval;
import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.repository.EventRepository;
import com.selab.Skillscore.repository.RequestApprovalRepository;
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

    @Autowired
    private RequestApprovalRepository requestApprovalRepository;


@Transactional
public void submitRequest(String studentId, Long eventId, Request request) {
    Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    if (student.getFaculty() == null) {
        throw new RuntimeException("Student does not have an assigned faculty advisor.");
    }

    request.setStudent(student);

    // ✅ Ensure description is correctly assigned
    if (request.getDescription() == null || request.getDescription().isEmpty()) {
        throw new RuntimeException("Description cannot be empty.");
    }

    Event event = null;
    if (eventId != null) {
        event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        request.setEvent(event);
        request.setActivityName(event.getName());
        request.setPoints(event.getPoints());
        request.setCoordinatorId(event.getFaculty().getFacultyId());
    }

    requestRepository.save(request);  // Save request

    // Create faculty approval entries
    List<RequestApproval> approvals = new ArrayList<>();

    if (student.getFaculty() != null) {
        approvals.add(new RequestApproval(request, student.getFaculty()));
    } else {
        throw new RuntimeException("Student does not have an assigned faculty advisor.");
    }

    if (event != null && event.getFaculty() != null) {
        approvals.add(new RequestApproval(request, event.getFaculty()));
    }

    requestApprovalRepository.saveAll(approvals);
}

}
