package com.selab.Skillscore.Controller;

import com.selab.Skillscore.Repository.ActivityRequestRepository;
import com.selab.Skillscore.entity.ActivityRequest;
import com.selab.Skillscore.entity.RequestStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faculty")
public class FacultyController {

    @Autowired
    private ActivityRequestRepository activityRequestRepository; // FIXED: Use Repository, not Entity

    @PutMapping("/approve/{requestId}")
    public ResponseEntity<String> approveRequest(@PathVariable Long requestId) {
        ActivityRequest request = activityRequestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.APPROVED); // FIXED: Use Enum
        activityRequestRepository.save(request);

        return ResponseEntity.ok("Request Approved");
    }

    @PutMapping("/reject/{requestId}")
    public ResponseEntity<String> rejectRequest(@PathVariable Long requestId, @RequestBody String comments) {
        ActivityRequest request = activityRequestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.REJECTED); // FIXED: Use Enum
        request.setFacultyComments(comments);
        activityRequestRepository.save(request);

        return ResponseEntity.ok("Request Rejected");
    }
}
