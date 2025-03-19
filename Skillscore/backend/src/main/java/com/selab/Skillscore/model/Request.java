// package com.selab.Skillscore.model;

// import java.time.LocalDate;
// import java.time.LocalTime;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;

// @Entity
// public class Request {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @ManyToOne
//     @JoinColumn(name = "student_id", referencedColumnName = "rollNumber", nullable = false)
//     private Student student;  // Auto-fills Student Name

//     @ManyToOne
//     @JoinColumn(name = "faculty_advisor_id", referencedColumnName = "facultyId", nullable = false)
//     private Faculty facultyAdvisor;  // Auto-fills from student's faculty

//     @ManyToOne
//     @JoinColumn(name = "event_id", referencedColumnName = "id", nullable = false)
//     private Event event;  // Auto-filled if event is selected, null if manual entry

//     private String eventName;  // Stored separately for manual entry
//     private String facultyName; // If event has a faculty, auto-fill
//     private int points;
//     private LocalDate date;
//     private LocalTime time;

//     private String status = "Pending";

//     public void setStudent(Student student) {
//         this.student = student;
//     }

//     public void setFacultyAdvisor(Faculty facultyAdvisor) {
//         this.facultyAdvisor = facultyAdvisor;
//     }

//     public void setEvent(Event event) {
//         this.event = event;
//     }

//     public void setEventName(String eventName) {
//         this.eventName = eventName;
//     }

//     public void setFacultyName(String facultyName) {
//         this.facultyName = facultyName;
//     }

//     public void setPoints(int points) {
//         this.points = points;
//     }

//     public void setDate(LocalDate date) {
//         this.date = date;
//     }

//     public void setTime(LocalTime time) {
//         this.time = time;
//     }

//     public String getEventName() {
//         return eventName;
//     }

//     public String getFacultyName() {
//         return facultyName;
//     }

//     public int getPoints() {
//         return points;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }

// }


package com.selab.Skillscore.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "request")
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

    
}
