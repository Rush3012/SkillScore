
package com.selab.Skillscore.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.dto.RequestResponseDTO;
import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.model.RequestApproval;
import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.repository.EventRepository;
import com.selab.Skillscore.repository.RequestApprovalRepository;
import com.selab.Skillscore.repository.RequestRepository;
import com.selab.Skillscore.repository.StudentRepository;
import com.selab.Skillscore.model.Status;

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

    // public List<Request> getRequestsByStatus(String rollNumber, Status status) {
    //     return switch (status) {
    //         case APPROVED -> requestRepository.findApprovedRequests(rollNumber);
    //         case REJECTED -> requestRepository.findRejectedRequests(rollNumber);     System.out.println("Fetched Rejected Requests: " + requests);
    //         case PENDING -> requestRepository.findPendingRequests(rollNumber);
    //         default -> throw new IllegalArgumentException("Invalid status: " + status);
    //     };
    // }

    public List<Request> getRequestsByStatus(String rollNumber, Status status) {
        return switch (status) {
            case APPROVED -> requestRepository.findApprovedRequests(rollNumber);
            case REJECTED -> {
                List<Request> requests = requestRepository.findRejectedRequests(rollNumber);
                System.out.println("Fetched Rejected Requests: " + requests);
                yield requests;  // Use `yield` to return a value inside a block
            }
            case PENDING -> requestRepository.findPendingRequests(rollNumber);
            default -> throw new IllegalArgumentException("Invalid status: " + status);
        };
    }

    public RequestResponseDTO getRequestById(Long requestId) {
        Request request = requestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Request not found"));
        List<RequestApproval> approvals = requestApprovalRepository.findByRequestId(requestId);

        Status status = determineRequestStatus(approvals);
        return new RequestResponseDTO(request, status);

    }

    private Status determineRequestStatus(List<RequestApproval> approvals) {
        if (approvals.isEmpty()) {
            return Status.PENDING;
        }

        boolean hasRejected = approvals.stream().anyMatch(approval -> Status.REJECTED.equals(approval.getStatus()));

        if (hasRejected) {
            return Status.REJECTED;
        }

        boolean allApproved = approvals.stream().allMatch(approval -> Status.APPROVED.equals(approval.getStatus()));

        return allApproved ? Status.APPROVED : Status.PENDING;
    }
    

    public List<RequestResponseDTO> getRequestsByFaculty(Long facultyId) {
        List<Request> requests = requestRepository.findRequestsByFacultyId(facultyId, Status.PENDING);

        // Convert Request -> RequestResponseDTO
        return requests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private RequestResponseDTO convertToDTO(Request request) {
        return new RequestResponseDTO(
            request, Status.PENDING
        );
    }


    @Transactional
    public boolean updateRequestStatus(Long facultyId, Long requestId, String status) {
        Optional<RequestApproval> approvalOpt = requestApprovalRepository.findByFacultyIdAndRequestId(facultyId, requestId);

        if (approvalOpt.isPresent()) {
            RequestApproval approval = approvalOpt.get();
            approval.setStatus(Status.valueOf(status));  // Update status

            if (status.equals("ACCEPTED")) {
                Request request = approval.getRequest();
                Student student = request.getStudent();
                student.setTotalPoints(student.getTotalPoints() + request.getPoints()); // Update student points
                if (request.getActivityType().equals("Institute Level")){
                    student.setInstitutePoints(student.getInstitutePoints() + request.getPoints());
                }
                else if (request.getActivityType().equals("Department Level")){
                    student.setDepartmentPoints(student.getDepartmentPoints() + request.getPoints());
                }
                
                studentRepository.save(student);
            }
            approval.setUpdatedAt(LocalDateTime.now());
            requestApprovalRepository.save(approval);
            return true;
        }
        return false;
    }

}
