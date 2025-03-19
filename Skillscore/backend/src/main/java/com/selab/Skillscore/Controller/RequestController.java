package com.selab.Skillscore.Controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
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

    @PostMapping(value = "/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> submitRequest(
        @RequestPart("studentId") String studentId,
        @RequestPart("eventId") String eventId,
        @RequestPart("description") String description) {
    System.out.println("Received studentId: " + studentId);

    Request request = new Request();
    request.setDescription(description);

    Long id = (long) Integer.parseInt(eventId);

    requestService.submitRequest(studentId, id, request);

    return ResponseEntity.ok("Request submitted successfully.");
}


}