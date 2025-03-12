package com.selab.Skillscore.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "faculty")
public class Faculty extends User {
    @OneToMany(mappedBy = "faculty")
    private List<ActivityRequest> requestsToReview;
}
