package com.selab.Skillscore.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "request_approval")
public class RequestApproval {
    @EmbeddedId
    private RequestApprovalId id;  // Composite key (requestId, facultyId)

    @ManyToOne
    @MapsId("requestId")
    @JoinColumn(name = "request_id", referencedColumnName = "id", nullable = false)
    private Request request;

    @ManyToOne
    @MapsId("facultyId")
    @JoinColumn(name = "faculty_id", referencedColumnName = "facultyId", nullable = false)
    private Faculty faculty;

    private String status = "Pending";  // Pending, Approved, Rejected

    private String comments;  // If rejected, store reason

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Constructor
    public RequestApproval(Request request, Faculty faculty) {
        this.id = new RequestApprovalId(request.getId(), faculty.getFacultyId());
        this.request = request;
        this.faculty = faculty;
    }

    // Getters & Setters
}
