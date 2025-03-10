package com.selab.Skillscore.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FacultyController {

    @GetMapping("/faculty/dashboard")  // Change the URL here
    public String facultyDashboard() {
        return "faculty-dashboard";  // Make sure `student-dashboard.html` exists
    }
}
