package com.selab.Skillscore.dto;

public class RequestDTO {
    private String studentId;  // Added this if you prefer body instead of param
    private Long eventId;
    private String description;

    // Getters & Setters
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}