package com.selab.Skillscore.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.selab.Skillscore.dto.RequestResponseDTO;
import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.model.Status;
import com.selab.Skillscore.service.RequestService;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @GetMapping("/{status}/{rollNumber}")
    public List<Request> getRequestsByStudent(@PathVariable("status") String status, @PathVariable String rollNumber) {
        try {
            Status requestStatus = Status.valueOf(status.toUpperCase());  // Convert to uppercase
            return requestService.getRequestsByStatus(rollNumber, requestStatus);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value: " + status);
        }
    }


    @PostMapping(value = "/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> submitRequest(
        @RequestPart("studentId") String studentId,
        @RequestPart("description") String description,
        @RequestPart("isOther") String isOtherStr,
        @RequestPart(value = "eventId", required = false) String eventId,
        @RequestPart(value = "activityName", required = false) String activityName,
        @RequestPart(value = "activityType", required = false) String activityType,
        @RequestPart(value = "coordinatorId", required = false) String coordinatorId,
        @RequestPart(value = "points", required = false) String pointsStr
        ) {
        System.out.println("Received studentId: " + studentId);

        Request request = new Request();
        request.setDescription(description);
        boolean isOther = Boolean.parseBoolean(isOtherStr);
        request.setIsOther(isOther);

        

        if (!isOther){
            Long id =  Long.parseLong(eventId);
            requestService.submitRequest(studentId, id, request);
        } else{
            request.setActivityName(activityName);
            request.setActivityType(activityType);
            request.setCoordinatorId(Long.parseLong(coordinatorId));
            request.setPoints(Integer.parseInt(pointsStr));
            requestService.submitRequest(studentId, null, request);
        }

        return ResponseEntity.ok("Request submitted successfully.");
    }


    @GetMapping("/{requestId}")
    public ResponseEntity<RequestResponseDTO> getRequestById(@PathVariable Long requestId) {
        RequestResponseDTO request = requestService.getRequestById(requestId);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<List<RequestResponseDTO>> getRequestsForFaculty(@PathVariable Long facultyId) {
        List<RequestResponseDTO> requests = requestService.getRequestsByFaculty(facultyId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/faculty/{facultyId}/{requestId}")
    public ResponseEntity<RequestResponseDTO> getRequestDetailsForFaculty(
            @PathVariable Long facultyId, 
            @PathVariable Long requestId) {
        
        List<RequestResponseDTO> requests = requestService.getRequestsByFaculty(facultyId);

        for (RequestResponseDTO req : requests) {
            if (req.getId().equals(requestId)) { 
                return ResponseEntity.ok(req);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(null);
    }
}