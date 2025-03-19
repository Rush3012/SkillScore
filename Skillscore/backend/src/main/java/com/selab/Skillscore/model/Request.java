
package com.selab.Skillscore.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "request",
uniqueConstraints = {@UniqueConstraint(columnNames = {"event_id", "student_id"})})
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "rollNumber", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "event_id", referencedColumnName = "id", nullable = true) // Can be null if manual entry
    private Event event;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private String description;


    



    public Long getId() {
        return id;
    };

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public void setDescription(String description){
            this.description = description;
    }

    public String getDescription() {
        return description;
    }

    
}