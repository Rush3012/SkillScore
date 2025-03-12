package com.selab.Skillscore.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;

@Controller
public class FacultyController {

    @GetMapping("/faculty/dashboard")  // Change the URL here
    public String facultyDashboard(HttpSession session, Model model) {
        if (session.getAttribute("loggedInUser") == null) {
            return "redirect:/login";
        }
        return "faculty-dashboard";  
    }
}

// package com.selab.Skillscore.Controller;

// import jakarta.servlet.http.HttpSession;
// import com.selab.Skillscore.model.User;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;

// @Controller
// public class FacultyController {
//     @GetMapping("/faculty/dashboard")
//     public String facultyDashboard(HttpSession session, Model model) {
//         User user = (User) session.getAttribute("user");
//         if (user == null || user.getRole() != User.Role.FACULTY) {
//             return "redirect:/login";
//         }
//         model.addAttribute("user", user);
//         return "faculty-dashboard";
//     }
// }

