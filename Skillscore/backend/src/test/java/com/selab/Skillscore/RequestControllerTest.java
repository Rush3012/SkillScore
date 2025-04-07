package com.selab.Skillscore;

import com.selab.Skillscore.Controller.RequestController;
import com.selab.Skillscore.dto.RequestResponseDTO;
import com.selab.Skillscore.model.*;
import com.selab.Skillscore.service.RequestService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RequestControllerTest {

    @Mock
    private RequestService requestService;
    
    @InjectMocks
    private RequestController requestController;
    
    private Request request;
    private RequestResponseDTO responseDTO;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        request = new Request();
        request.setId(1L);
        request.setDescription("Test Request");
        
        responseDTO = new RequestResponseDTO(request, Status.PENDING, new Faculty());
    }

    @Test
    void getRequestsByStudent_WithValidStatus_ShouldReturnRequests() {
       
        when(requestService.getRequestsByStatus("CS2023001", Status.PENDING))
            .thenReturn(Collections.singletonList(request));
        
        List<Request> result = requestController.getRequestsByStudent("pending", "CS2023001");
        
        assertEquals(1, result.size());
        assertEquals(request.getId(), result.get(0).getId());
    }

    @Test
    void getRequestsByStudent_WithInvalidStatus_ShouldThrowBadRequest() {
       
        assertThrows(ResponseStatusException.class, () -> 
            requestController.getRequestsByStudent("invalid", "CS2023001"));
    }

    @Test
    void getRequestById_ShouldReturnRequestDTO() {
      
        when(requestService.getRequestById(1L)).thenReturn(responseDTO);
        
        ResponseEntity<RequestResponseDTO> response = requestController.getRequestById(1L);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(responseDTO, response.getBody());
    }

    @Test
    void getRequestsForFaculty_ShouldReturnRequestList() {
      
        when(requestService.getRequestsByFaculty(1L))
            .thenReturn(Collections.singletonList(responseDTO));
        
        
        ResponseEntity<List<RequestResponseDTO>> response = requestController.getRequestsForFaculty(1L);
        
        assertEquals(1, response.getBody().size());
        assertEquals(responseDTO, response.getBody().get(0));
    }

    @Test
    void updateRequestStatus_Approved_ShouldReturnSuccess() {
     
        when(requestService.updateRequestStatus(1L, 1L, "APPROVED", "Good job"))
            .thenReturn(true);
        
       
        ResponseEntity<String> response = requestController.updateRequestStatus(
            1L, 1L, "approved", Map.of("reason", "Good job"));
        
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Status updated successfully.", response.getBody());
    }

    @Test
    void updateRequestStatus_Failed_ShouldReturnBadRequest() {
        
        when(requestService.updateRequestStatus(1L, 1L, "REJECTED", "Incomplete"))
            .thenReturn(false);
        
        ResponseEntity<String> response = requestController.updateRequestStatus(
            1L, 1L, "rejected", Map.of("reason", "Incomplete"));
        
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}