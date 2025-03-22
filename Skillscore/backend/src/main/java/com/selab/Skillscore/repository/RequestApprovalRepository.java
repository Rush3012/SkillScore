package com.selab.Skillscore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.selab.Skillscore.model.RequestApproval;
import com.selab.Skillscore.model.RequestApprovalId;

@Repository
public interface RequestApprovalRepository extends JpaRepository<RequestApproval, RequestApprovalId> {
    List<RequestApproval> findByRequestId(Long requestId);
    Optional<RequestApproval> findByFacultyIdAndRequestId(Long facultyId, Long requestId);


}