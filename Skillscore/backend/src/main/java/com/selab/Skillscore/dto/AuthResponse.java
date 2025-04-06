package com.selab.Skillscore.dto;

import com.selab.Skillscore.model.Role;

public class AuthResponse {
    private Long userId;
    private String role;  // Keep it as String

    public AuthResponse(Long userId, Role role) { 
        this.userId = userId;
        this.role = role.name(); // Convert Enum to String
    }

    public Long getUserId() { return userId; }
    public String getRole() { return role; }
}
