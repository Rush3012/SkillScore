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

// package com.selab.Skillscore.Controller;

// import jakarta.servlet.http.HttpSession;
// import com.selab.Skillscore.model.User;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;

// @Controller
// public class StudentController {
//     @GetMapping("/student/dashboard")
//     public String studentDashboard(HttpSession session, Model model) {
//         User user = (User) session.getAttribute("user");
//         if (user == null || user.getRole() != User.Role.STUDENT) {
//             return "redirect:/login";
//         }
//         model.addAttribute("user", user);
//         return "student-dashboard";
//     }
// }

