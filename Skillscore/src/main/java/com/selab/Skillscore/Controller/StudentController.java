package com.selab.Skillscore.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudentController {

    @GetMapping("/student/dashboard")  // Change the URL here
    public String studentDashboard() {
        return "student-dashboard";  // Make sure `student-dashboard.html` exists
    }
}
