package com.selab.Skillscore.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;


@Controller
public class StudentController {

    @GetMapping("/student/dashboard")  
    public String studentDashboard(HttpSession session, Model model) {
        if (session.getAttribute("loggedInUser") == null) {
            return "redirect:/login";
        }
        return "student-dashboard";  
    }
}
