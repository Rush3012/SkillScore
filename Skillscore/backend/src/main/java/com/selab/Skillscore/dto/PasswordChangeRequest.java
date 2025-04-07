package com.selab.Skillscore.dto;


public class PasswordChangeRequest {
    private Long userId;
    private String currentPassword;
    private String newPassword;

    // Default constructor (needed by Jackson)
    public PasswordChangeRequest() {}

    public Long getUserId() {return userId;}
    public void setUserId(Long userId) {this.userId = userId;}
    public String getCurrentPassword() { return currentPassword; }
    public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
