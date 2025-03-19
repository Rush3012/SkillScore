package com.selab.Skillscore.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.dto.RequestDTO;
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

    // @Transactional
    // public void submitRequest(String studentId, Long eventId, Request request) {
    //     Student student = studentRepository.findById(studentId)
    //             .orElseThrow(() -> new RuntimeException("Student not found"));
    
    //     if (student.getFaculty() == null) {
    //         throw new RuntimeException("Student does not have an assigned faculty advisor.");
    //     }
    
    //     request.setStudent(student);
    //     if (eventId != null) {
    //         Event event = eventRepository.findById(eventId)
    //                 .orElseThrow(() -> new RuntimeException("Event not found"));
    //         request.setEvent(event);
    //     }
    
    //     requestRepository.save(request);  // Save the request
    
    //     // Create faculty approval entries
    //     List<RequestApproval> approvals = new ArrayList<>();
    
    //     // Always add Faculty Advisor
    //     approvals.add(new RequestApproval(request, student.getFaculty()));
    
    //     // Add Faculty in Charge (if applicable)
    //     if (eventId != null && event.getFaculty() != null) {
    //         approvals.add(new RequestApproval(request, event.getFaculty()));
    //     }
    
    //     requestApprovalRepository.saveAll(approvals);
    // }
    


//     @Transactional
// public void submitRequest(String studentId, Long eventId, Request request) {
//     Student student = studentRepository.findById(studentId)
//             .orElseThrow(() -> new RuntimeException("Student not found"));

//     if (student.getFaculty() == null) {
//         throw new RuntimeException("Student does not have an assigned faculty advisor.");
//     }

//     request.setStudent(student);

//     Event event = null;
//     if (eventId != null) {
//         event = eventRepository.findById(eventId)
//                 .orElseThrow(() -> new RuntimeException("Event not found"));
//         request.setEvent(event);  // Only if events are needed
//     }

//     requestRepository.save(request);  // Save the request

//     // Create faculty approval entries
//     List<RequestApproval> approvals = new ArrayList<>();

//     // // Always add Faculty Advisor
//     // approvals.add(new RequestApproval(request, student.getFaculty()));

//     // // Add Faculty in Charge (if applicable)
//     // if (event != null && event.getFaculty() != null) {
//     //     approvals.add(new RequestApproval(request, event.getFaculty()));
//     // }


//     // Always add Faculty Advisor if assigned
// if (student.getFaculty() != null) {
//     approvals.add(new RequestApproval(request, student.getFaculty()));
// } else {
//     throw new RuntimeException("Student does not have an assigned faculty advisor.");
// }

// // Add Faculty in Charge (if applicable)
// if (event != null && event.getFaculty() != null) {
//     approvals.add(new RequestApproval(request, event.getFaculty()));
// }



//     requestApprovalRepository.saveAll(approvals);
// }

// }



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