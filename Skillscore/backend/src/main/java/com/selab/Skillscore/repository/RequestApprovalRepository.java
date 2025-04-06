package com.selab.Skillscore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.selab.Skillscore.model.RequestApproval;
import com.selab.Skillscore.model.RequestApprovalId;

@Repository
public interface RequestApprovalRepository extends JpaRepository<RequestApproval, RequestApprovalId> {
    List<RequestApproval> findByRequestId(Long requestId);
    Optional<RequestApproval> findByFacultyIdAndRequestId(Long facultyId, Long requestId);


    
    @Modifying
    @Transactional
    @Query("DELETE FROM RequestApproval ra WHERE ra.request.id IN :requestIds")
    void deleteByRequestIdIn(@Param("requestIds") List<Long> requestIds);
    
}


