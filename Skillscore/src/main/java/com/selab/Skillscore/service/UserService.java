// package com.selab.Skillscore.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.selab.Skillscore.model.*;
// import com.selab.Skillscore.repository.*;

// import java.util.Optional;

// @Service
// public class UserService {
//     @Autowired
//     private UserRepository userRepository;
        
//     public Optional<User> findByUsername(String username) {
//         return userRepository.findByUsername(username);
//     }
    
//     public User saveUser(User user) {
//         // Don't encode passwords if using NoOpPasswordEncoder
//         user.setPassword(user.getPassword());
//         return userRepository.save(user);
//     }
    
//     public String getDashboardUrl(String username) {
//         Optional<User> userOptional = userRepository.findByUsername(username);
        
//         if (!userOptional.isPresent()) {
//             return "redirect:/login?error";
//         }

//         User user = userOptional.get(); // ✅ Extract User object safely

//         if (user.getRole() == Role.STUDENT) {
//             return "student-dashboard";
//         } else if (user.getRole() == Role.FACULTY) {
//             return "faculty-dashboard";
//         } else {
//             return "redirect:/login?error=role";
//         }
//     }
// }


package com.selab.Skillscore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.model.*;
import com.selab.Skillscore.repository.*;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
