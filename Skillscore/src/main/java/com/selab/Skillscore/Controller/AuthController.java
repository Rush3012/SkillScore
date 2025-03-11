// package com.selab.Skillscore.Controller;

// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;

// import com.selab.Skillscore.model.Role;
// import com.selab.Skillscore.model.User;
// import com.selab.Skillscore.service.UserService;


// @Controller
// public class AuthController {
//     @Autowired
//     private UserService userService;


//     @PostMapping("/register")
//     public String registerUser(@RequestBody User user) {
//         userService.saveUser(user);
//         return "User registered successfully!";
//     }

//     @GetMapping("/login")
//     public String loginPage() {
//         return "login";
//     }

//     @PostMapping("/login")
//     public String login(@RequestParam String username, @RequestParam String password, Model model) {
//         Optional<User> userOptional = userService.findByUsername(username);

//         if (userOptional.isPresent()) {
//             User user = userOptional.get();

//             System.out.println("Entered password: " + password);
//             System.out.println("Stored password: " + user.getPassword());

//             // Compare plain text passwords directly
//             if (password.equals(user.getPassword())) { 
//                 System.out.println("Password matched!");

//                 if (user.getRole().equals(Role.STUDENT)) {
//                     return "student-dashboard";
//                 } else if (user.getRole().equals(Role.FACULTY)) {
//                     return "faculty-dashboard"; // Redirect to faculty dashboard

//                 }
//             } else {
//                 System.out.println("Password did NOT match!");
//             }
//         } else {
//             System.out.println("User not found!");
//         }

//         model.addAttribute("error", "Invalid username or password");
//         return "login";
//     }
// }


package com.selab.Skillscore.Controller;

import java.util.Optional;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.selab.Skillscore.model.User;
import com.selab.Skillscore.service.UserService;

@Controller
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, Model model, HttpSession session) {
        Optional<User> userOptional = userService.findByUsername(username);

        if (userOptional.isPresent() && password.equals(userOptional.get().getPassword())) { 
            User user = userOptional.get();
            session.setAttribute("loggedInUser", user);  // Store user session
            return "redirect:/" + user.getRole().name().toLowerCase() + "/dashboard"; // Dynamic redirection
        }

        model.addAttribute("error", "Invalid username or password");
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();  // Destroy session
        return "redirect:/login?logout=true"; // Redirect to login page with logout message
    }
}
