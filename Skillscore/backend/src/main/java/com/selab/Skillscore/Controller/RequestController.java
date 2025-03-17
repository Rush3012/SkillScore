package com.selab.Skillscore.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.selab.Skillscore.dto.RequestDTO;
import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.service.RequestService;

@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

//     @PostMapping("/submit")
//     public ResponseEntity<String> submitRequest(
//             @RequestParam String studentId, 
//             @RequestParam(required = false) Long eventId, 
//             @RequestBody Request request) {
//         try {
//             requestService.submitRequest(studentId, eventId, request);
//             return ResponseEntity.ok("Request submitted successfully.");
//         } catch (RuntimeException e) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//         }
//     }

//     @GetMapping("/faculty/{facultyId}/pending")
//     public ResponseEntity<List<Request>> getPendingRequestsForFaculty(@PathVariable Long facultyId) {
//         List<Request> pendingRequests = requestService.getPendingRequestsForFaculty(facultyId);
//         return ResponseEntity.ok(pendingRequests);
//     }

//     @GetMapping("/faculty-advisor/{facultyId}/pending")
//     public ResponseEntity<List<Request>> getPendingRequestsForFacultyAdvisor(@PathVariable Long facultyId) {
//         List<Request> pendingRequests = requestService.getPendingRequestsForFacultyAdvisor(facultyId);
//         return ResponseEntity.ok(pendingRequests);
//     }
// }


@PostMapping("/submit")
public ResponseEntity<String> submitRequest(@RequestBody RequestDTO requestDTO) {  
    System.out.println("Received studentId: " + requestDTO.getStudentId());
    System.out.println("Received eventId: " + requestDTO.getEventId());

    Request request = new Request();
    request.setDescription(requestDTO.getDescription());

    requestService.submitRequest(requestDTO.getStudentId(), requestDTO.getEventId(), request);

    return ResponseEntity.ok("Request submitted successfully.");
}


}
