package com.selab.Skillscore.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status = Status.PENDING;  // Pending, Approved, Rejected

    private String comments;  // If rejected, store reason

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Constructor

    public RequestApproval() {
    }
    public RequestApproval(Request request, Faculty faculty) {
        this.id = new RequestApprovalId(request.getId(), faculty.getFacultyId());
        this.request = request;
        this.faculty = faculty;
    }

    public RequestApprovalId getId() {
        return id;
    }

    public void setId(RequestApprovalId id) {
        this.id = id;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }


}