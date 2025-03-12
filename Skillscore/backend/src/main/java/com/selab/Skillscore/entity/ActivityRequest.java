package com.selab.Skillscore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "activity_requests")
public class ActivityRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Student student;
    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    
    //private String eventName;
    //private String description;
    //private LocalDate eventDate;
    
    @Enumerated(EnumType.STRING)
    private RequestStatus status; // PENDING, APPROVED, REJECTED

    //private String facultyComments;

    public Object findById(Long requestId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    public void save(ActivityRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public void setFacultyComments(String comments) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFacultyComments'");
    }
}


