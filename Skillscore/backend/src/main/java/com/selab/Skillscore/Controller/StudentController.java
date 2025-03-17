package com.selab.Skillscore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.selab.Skillscore.service.StudentService;
import com.selab.Skillscore.dto.StudentDashboardDTO;
import com.selab.Skillscore.model.Student;



@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;

    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<StudentDashboardDTO> getStudentDashboard(@PathVariable Long userId) {
        StudentDashboardDTO dashboard = studentService.getStudentDashboard(userId);
        if (dashboard != null) {
            return ResponseEntity.ok(dashboard);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/by-user/{userId}")
    public Student getStudentByUserId(@PathVariable Long userId) {
        return studentService.getStudentByUserId(userId);
    }

}

