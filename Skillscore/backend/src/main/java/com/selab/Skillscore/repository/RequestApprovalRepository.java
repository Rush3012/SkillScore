package com.selab.Skillscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.selab.Skillscore.model.RequestApproval;
import com.selab.Skillscore.model.RequestApprovalId;

@Repository
public interface RequestApprovalRepository extends JpaRepository<RequestApproval, RequestApprovalId> {
}