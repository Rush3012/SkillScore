package com.selab.Skillscore;

import com.selab.Skillscore.dto.RequestResponseDTO;
import com.selab.Skillscore.model.*;
import com.selab.Skillscore.repository.*;
import com.selab.Skillscore.service.FacultyService;
import com.selab.Skillscore.service.RequestService;

import jakarta.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class RequestServiceTest {

    @Mock
    private RequestRepository requestRepository;
    
    @Mock
    private StudentRepository studentRepository;
    
    @Mock
    private EventRepository eventRepository;
    
    @Mock
    private RequestApprovalRepository requestApprovalRepository;
    
    @Mock
    private FacultyService facultyService;
    
    @InjectMocks
    private RequestService requestService;
    
    private Student student;
    private Faculty faculty;
    private Event event;
    private Request request;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        faculty = new Faculty();
        faculty.setFacultyId(1L);
        faculty.setName("Dr. Smith");
        
        student = new Student();
        student.setRollNumber("CS2023001");
        student.setName("John Doe");
        student.setFaculty(faculty);
        
        event = new Event();
        event.setId(1L);
        event.setName("Tech Symposium");
        event.setPoints(50);
        event.setFaculty(faculty);
        
        request = new Request();
        request.setId(1L);
        request.setDescription("Participated in coding competition");
        request.setStudent(student);
    }

    @Test
@Transactional
void submitRequest_WithValidEvent_ShouldSaveRequestAndApprovals() {
    
    when(studentRepository.findById("CS2023001")).thenReturn(Optional.of(student));
    when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
    when(facultyService.getFacultyById(1L)).thenReturn(faculty);
    
    // list for saved 
    List<RequestApproval> savedApprovals = new ArrayList<>();
    doAnswer(invocation -> {
        savedApprovals.addAll(invocation.getArgument(0));
        return null;
    }).when(requestApprovalRepository).saveAll(anyList());

    requestService.submitRequest("CS2023001", 1L, request);
    
    verify(requestRepository).save(request);
    verify(requestApprovalRepository).saveAll(anyList());
    
    assertEquals(2, savedApprovals.size());
    assertTrue(savedApprovals.stream().anyMatch(a -> a.getFaculty().equals(student.getFaculty())));
    assertTrue(savedApprovals.stream().anyMatch(a -> a.getFaculty().equals(faculty)));
}

    @Test
    @Transactional
    void submitRequest_WithOtherActivity_ShouldSaveRequestWithCustomDetails() {
        
        request.setIsOther(true);
        request.setActivityName("Research Paper");
        request.setActivityType("Research");
        request.setPoints(100);
        request.setCoordinatorId(1L);
        
        when(studentRepository.findById("CS2023001")).thenReturn(Optional.of(student));
        when(facultyService.getFacultyById(1L)).thenReturn(faculty);
        
        requestService.submitRequest("CS2023001", null, request);
        
        verify(requestRepository).save(request);
        assertEquals("Research Paper", request.getActivityName());
        assertEquals(100, request.getPoints());
    }

    @Test
    void getRequestsByStatus_Approved_ShouldReturnApprovedRequests() {
        
        List<Request> expectedRequests = Collections.singletonList(request);
        when(requestRepository.findApprovedRequests("CS2023001")).thenReturn(expectedRequests);
        
        List<Request> result = requestService.getRequestsByStatus("CS2023001", Status.APPROVED);
        
        assertEquals(1, result.size());
        assertEquals(request.getId(), result.get(0).getId());
    }

    @Test
    void getRequestById_ShouldReturnRequestWithStatus() {
        
        RequestApproval approval = new RequestApproval(request, faculty);
        approval.setStatus(Status.APPROVED);
        
        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));
        when(requestApprovalRepository.findByRequestId(1L)).thenReturn(Collections.singletonList(approval));
        when(facultyService.getFacultyById(anyLong())).thenReturn(faculty);
        
        RequestResponseDTO result = requestService.getRequestById(1L);
        
        assertNotNull(result);
        assertEquals(Status.APPROVED, result.getStatus());
    }

    @Test
    void updateRequestStatus_ApprovedWithAllApprovals_ShouldUpdateStudentPoints() {
        
        RequestApproval approval = new RequestApproval(request, faculty);
        approval.setStatus(Status.PENDING);
        
        when(requestApprovalRepository.findByFacultyIdAndRequestId(1L, 1L)).thenReturn(Optional.of(approval));
        when(requestApprovalRepository.findByRequestId(1L)).thenReturn(Collections.singletonList(approval));
        when(studentRepository.findById(anyString())).thenReturn(Optional.of(student));
        
        boolean result = requestService.updateRequestStatus(1L, 1L, "APPROVED", "Good work");
        
        assertTrue(result);
        assertEquals(Status.APPROVED, approval.getStatus());
        verify(studentRepository).save(student);
    }

    @Test
void updateRequest_ForExistingEvent_ShouldUpdateOnlyDescription() {
    
    Request existingRequest = new Request();
    existingRequest.setId(1L);
    existingRequest.setDescription("Original description");
    existingRequest.setEvent(event); 
    
    Request updatedRequest = new Request();
    updatedRequest.setId(1L);
    updatedRequest.setDescription("Updated description");
    updatedRequest.setEvent(event); 
    
    when(requestRepository.findById(1L)).thenReturn(Optional.of(existingRequest));
    when(requestApprovalRepository.findByRequestId(1L)).thenReturn(new ArrayList<>());
    when(requestRepository.save(any(Request.class))).thenReturn(updatedRequest);
    
    Request result = requestService.updateRequest(
        1L, 
        "Updated description", 
        null, 
        null
    );
    
    assertNotNull(result, "Updated request should not be null");
    assertEquals("Updated description", result.getDescription());
    assertNotNull(result.getEvent(), "Event should remain unchanged");
    assertEquals(event.getId(), result.getEvent().getId());
    
    assertNull(result.getActivityType());
    assertEquals(0, result.getPoints());
    assertEquals(0, result.getCoordinatorId());
}
}
