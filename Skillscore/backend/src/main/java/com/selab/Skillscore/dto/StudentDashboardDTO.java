package com.selab.Skillscore.dto;


    
public class StudentDashboardDTO {
    private String id;
    private String name;
    private String department;
    private int totalPoints;
    private String facultyName;

    public StudentDashboardDTO(String id, String name, String department, int totalPoints, String facultyName) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.totalPoints = totalPoints;
        this.facultyName = facultyName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    public int getTotalPoints() {
        return totalPoints;
    }
    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }
    public String getFacultyName() {
        return facultyName;
    }
    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    
}
