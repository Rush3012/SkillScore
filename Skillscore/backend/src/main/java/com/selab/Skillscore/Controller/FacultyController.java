package com.selab.Skillscore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import com.selab.Skillscore.service.FacultyService;
import com.selab.Skillscore.dto.FacultyDashboardDTO;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {
    
    @Autowired
    private FacultyService facultyService;

    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<FacultyDashboardDTO> getFacultyDashboard(@PathVariable Long userId) {
        FacultyDashboardDTO dashboard = facultyService.getFacultyDashboard(userId);
        if (dashboard != null) {
            return ResponseEntity.ok(dashboard);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}


