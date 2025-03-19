package com.selab.Skillscore.Controller;

import java.security.Principal;
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





//needed


// @PostMapping("/submit")
// public ResponseEntity<String> submitRequest(@RequestBody RequestDTO requestDTO, Principal principal) {  
//     String studentId = principal.getName(); 
//     System.out.println("Received studentId: " + studentId);
//     System.out.println("Received eventId: " + requestDTO.getEventId());

//     Request request = new Request();
//     request.setDescription(requestDTO.getDescription());

//     requestService.submitRequest(studentId, requestDTO.getEventId(), request);

//     return ResponseEntity.ok("Request submitted successfully.");
// }


@PostMapping("/submit")
public ResponseEntity<String> submitRequest(@RequestBody RequestDTO requestDTO) {  
    String studentId = requestDTO.getStudentId();  
    System.out.println("Received studentId: " + studentId);
    System.out.println("Received eventId: " + requestDTO.getEventId());

    Request request = new Request();
    request.setDescription(requestDTO.getDescription());

    requestService.submitRequest(studentId, requestDTO.getEventId(), request);

    return ResponseEntity.ok("Request submitted successfully.");
}


}