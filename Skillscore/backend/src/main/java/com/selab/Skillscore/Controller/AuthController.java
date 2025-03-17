

package com.selab.Skillscore.Controller;

import java.util.Map;
import java.util.Optional;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
    Optional<User> userOptional = userService.findByUsername(loginRequest.getUsername());

    if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginRequest.getPassword())) { 
        User user = userOptional.get();
        session.setAttribute("loggedInUser", user);  // Store user session

        return ResponseEntity.ok(Map.of(
            "message", "Login Successful",
            "role", user.getRole().name().toLowerCase(),
            "userId", user.getId()
        ));
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
}

    // DTO Class for JSON Request
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public String getPassword() { return password; }
    }


    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();  // Destroy session
        return "redirect:/login?logout=true"; // Redirect to login page with logout message
    }

    @GetMapping("/api/auth/role")
public ResponseEntity<?> getUserRole(HttpSession session) {
    User loggedInUser = (User) session.getAttribute("loggedInUser");

    if (loggedInUser != null) {
        return ResponseEntity.ok(Map.of("role", loggedInUser.getRole().name().toLowerCase()));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not logged in"));
    }
}

}
