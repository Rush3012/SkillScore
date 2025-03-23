
package com.selab.Skillscore.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private FacultyService facultyService;



    @Transactional
    public void submitRequest(String studentId, Long eventId, Request request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (student.getFaculty() == null) {
            throw new RuntimeException("Student does not have an assigned faculty advisor.");
        }

        request.setStudent(student);

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

        
            approvals.add(new RequestApproval(request, facultyService.getFacultyById(request.getCoordinatorId())));
        

        requestApprovalRepository.saveAll(approvals);
    }

    

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
        return new RequestResponseDTO(request, status, facultyService.getFacultyById(request.getCoordinatorId()));

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
            request, Status.PENDING, facultyService.getFacultyById(request.getCoordinatorId())
        );
    }


    @Transactional
    public boolean updateRequestStatus(Long facultyId, Long requestId, String status, String comment) {
        Optional<RequestApproval> approvalOpt = requestApprovalRepository.findByFacultyIdAndRequestId(facultyId, requestId);

        if (approvalOpt.isPresent()) {
            RequestApproval approval = approvalOpt.get();
            approval.setStatus(Status.valueOf(status));  // Update status

            if (status.equals("APPROVED")) {
                System.out.println("how are you?");
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
            approval.setComments(comment);
            approval.setUpdatedAt(LocalDateTime.now());
            requestApprovalRepository.save(approval);
            return true;
        }
        return false;
    }

    public Request updateRequest(Long id, String description, String activityType, String coordinatorId) {
        Request request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        System.out.println("get event details: " + request.getEvent());
        if (request.getEvent() != null) {
            // Case 1: Existing event (Allow only description & file update)
            request.setDescription(description);
        } 
        else {
            // Case 2: "Other Event" (Allow everything except title)
            request.setDescription(description);
            request.setActivityType(activityType);
            request.setCoordinatorId(Long.parseLong(coordinatorId));
        }

        return requestRepository.save(request);
    }

    

}
