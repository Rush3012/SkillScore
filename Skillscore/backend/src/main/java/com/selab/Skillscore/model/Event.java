package com.selab.Skillscore.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "events")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // ✅ Fix serialization issue
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 10000)
    private String description;

    @Column
    private String activityType;
    
    @Column(nullable = false)
    private Integer points;
    
    @Column(nullable = true)
    private LocalDate startDate;
    
    @Column(nullable = true)
    private LocalDate endDate;
    
    @Column(nullable = true)
    private LocalTime time;

    @Column
    private String regFee;
    
    @Column(length = 1000)
    private String image;
    
    @Column(length = 2000)
    private String registrationLink;

    @Column(nullable = true)
    private String venue;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "faculty_id", referencedColumnName = "facultyId", nullable = false)
    private Faculty faculty;

    // Constructors
    public Event() {}

    public Event(String name, String description, int points, LocalDate startDate, LocalDate endDate, LocalTime time, String image, String registrationLink, String venue, String activityType, String regFee, Faculty faculty) {
        this.name = name;
        this.description = description;
        this.points = points;
        this.startDate = startDate;
        this.endDate = endDate;
        this.time = time;
        this.image = image;
        this.registrationLink = registrationLink;
        this.faculty = faculty;
        this.venue = venue;
        this.activityType = activityType;
        this.regFee = regFee;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getRegistrationLink() { return registrationLink; }
    public void setRegistrationLink(String registrationLink) { this.registrationLink = registrationLink; }
    public Faculty getFaculty() { return faculty; }
    public void setFaculty(Faculty faculty) { this.faculty = faculty; }
    public String getVenue() {return venue;}
    public void setVenue(String venue) {this.venue = venue;}
    public String getActivityType() {return activityType;}
    public void setActivityType(String activityType) {this.activityType = activityType;}
    public String getRegFee() {return regFee;}
    public void setRegFee(String regFee) {this.regFee = regFee;}
}