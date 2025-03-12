package com.selab.Skillscore.Controller;

import com.selab.Skillscore.Repository.ActivityRequestRepository;
import com.selab.Skillscore.entity.ActivityRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private ActivityRequestRepository requestService;

    @PostMapping("/{studentId}/submit-request")
    public ResponseEntity<Object> submitActivityRequest(
        @PathVariable Long studentId, @RequestBody ActivityRequest request) {
        return ResponseEntity.ok(requestService.submitRequest(request));
    }

    @GetMapping("/{studentId}/requests")
    public ResponseEntity<Object> getRequests(@PathVariable Long studentId) {
        return ResponseEntity.ok(requestService.getStudentRequests(studentId));
    }
}

