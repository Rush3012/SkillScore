package com.selab.Skillscore.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class RequestApprovalId implements Serializable {
    private Long requestId;
    private Long facultyId;

    public RequestApprovalId() {}

    public RequestApprovalId(Long requestId, Long facultyId) {
        this.requestId = requestId;
        this.facultyId = facultyId;
    }

    // Getters, Setters, hashCode, equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RequestApprovalId that = (RequestApprovalId) o;
        return Objects.equals(requestId, that.requestId) &&
               Objects.equals(facultyId, that.facultyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(requestId, facultyId);
    }
}