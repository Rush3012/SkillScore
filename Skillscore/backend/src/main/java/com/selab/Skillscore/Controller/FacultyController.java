package com.selab.Skillscore.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import com.selab.Skillscore.service.FacultyService;
import com.selab.Skillscore.dto.FacultyDashboardDTO;
import com.selab.Skillscore.model.Faculty;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {
    
    @Autowired
    private FacultyService facultyService;

    @GetMapping
    public ResponseEntity<List<Faculty>> getAllFaculty() {
        List<Faculty> facultyList = facultyService.getAllFaculty();
        return ResponseEntity.ok(facultyList);
    }

    // @GetMapping("/dashboard/{userId}")
    // public ResponseEntity<FacultyDashboardDTO> getFacultyDashboard(@PathVariable Long userId) {
    //     FacultyDashboardDTO dashboard = facultyService.getFacultyDashboard(userId);
    //     if (dashboard != null) {
    //         return ResponseEntity.ok(dashboard);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    //     }
    // }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Map<String, Object>> getFacultyByUserId(@PathVariable Long userId) {
        Faculty faculty = facultyService.getFacultyByUserId(userId);
        int studentCount = facultyService.getStudentCountByFacultyId(faculty.getFacultyId());

        // Create a response object with faculty details and student count
        Map<String, Object> response = new HashMap<>();
        response.put("facultyId", faculty.getFacultyId());
        response.put("name", faculty.getName());
        response.put("department", faculty.getDepartment());
        response.put("isAdvisor", faculty.getIsAdvisor());
        response.put("user", faculty.getUser());
        response.put("studentCount", studentCount);

        return ResponseEntity.ok(response);

    }
}


