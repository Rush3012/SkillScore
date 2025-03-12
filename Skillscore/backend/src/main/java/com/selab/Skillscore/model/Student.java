package com.selab.Skillscore.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data 
public class Student {
    @Id
    private String rollNumber;
    private String name;
    private String department;
    private int totalPoints;
    
    @ManyToOne
    @JoinColumn(name = "faculty_id", referencedColumnName = "facultyId")
    @JsonBackReference  // Prevents recursion
    private Faculty faculty;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    public String getId() { return rollNumber; }
    public void setId(String id) { this.rollNumber = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public int getTotalPoints() { return totalPoints; }
    public void setTotalPoints(int totalPoints) { this.totalPoints = totalPoints; }
    public Faculty getFaculty() { return faculty; }
    public void setFaculty(Faculty faculty) { this.faculty = faculty; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

}
