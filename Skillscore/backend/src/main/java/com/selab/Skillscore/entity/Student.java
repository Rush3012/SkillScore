package com.selab.Skillscore.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student extends User {
    //private int totalPoints;
    
    @OneToMany(mappedBy = "student")
    private List<ActivityRequest> activityRequests;
}
