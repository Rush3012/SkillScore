
package com.selab.Skillscore.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "request",
uniqueConstraints = {@UniqueConstraint(columnNames = {"event_id", "student_id"}),
                    @UniqueConstraint(columnNames = {"student_id", "activityName", "activityType", "points"})})
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "rollNumber", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id", nullable = true) 
    private Event event;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private String description;

    private boolean isOther = false;
    private String activityName;
    private String activityType;
    private long coordinatorId;
    private int points;
    

    public Long getId() {
        return id;
    };

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Event getEvent() {
        return event;
    }

    public void setDescription(String description){
            this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setIsOther(boolean isOther){
        this.isOther = isOther;
    }

    public boolean getIsOther() {
        return isOther;
    }

    public void setActivityName(String activityName){
        this.activityName = activityName;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityType(String activityType){
        this.activityType = activityType;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setPoints(int points){
        this.points = points;
    }

    public int getPoints() {
        return points;
    }

    public void setCoordinatorId(long coordinatorId){
        this.coordinatorId = coordinatorId;
    }

    public long getCoordinatorId() {
        return coordinatorId;
    }

    
}