package com.selab.Skillscore.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.selab.Skillscore.service.StudentService;
import com.selab.Skillscore.model.Student;



@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;

    
    @GetMapping("/by-user/{userId}")
    public Student getStudentByUserId(@PathVariable Long userId) {
        System.out.println("entered id thing");
        return studentService.getStudentByUserId(userId);
    }

    @GetMapping("/faculty/{facultyId}")
    public List<Student> getStudentsByFaculty(@PathVariable Long facultyId) {
        return studentService.getStudentsByFacultyId(facultyId);
    }

    @GetMapping("/{rollNumber}")
    public Student getStudentsByStudent(@PathVariable String rollNumber){
        return studentService.getStudentsByStudentRollNumber(rollNumber);
    }

}

