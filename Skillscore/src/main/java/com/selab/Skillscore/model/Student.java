package com.selab.Skillscore.model;

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
    private Faculty faculty;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
