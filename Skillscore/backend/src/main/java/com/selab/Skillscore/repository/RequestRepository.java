package com.selab.Skillscore.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.model.Status;

public interface RequestRepository extends JpaRepository<Request, Long> {
    @Query("""
        SELECT r FROM Request r 
        JOIN RequestApproval ra ON ra.request = r 
        WHERE r.student.rollNumber = :rollNumber 
        AND ra.status = com.selab.Skillscore.model.Status.APPROVED
        
        """)
    List<Request> findApprovedRequests(@Param("rollNumber") String rollNumber);


    @Query("""
        SELECT r FROM Request r 
        JOIN RequestApproval ra ON ra.request = r 
        WHERE r.student.rollNumber = :rollNumber 
        AND ra.status = com.selab.Skillscore.model.Status.REJECTED
     """)
    List<Request> findRejectedRequests(@Param("rollNumber") String rollNumber);
    
    

    @Query("""
        SELECT r FROM Request r 
        WHERE r.student.rollNumber = :rollNumber 
        AND NOT EXISTS (
            SELECT 1 FROM RequestApproval ra 
            WHERE ra.request = r AND ra.status = com.selab.Skillscore.model.Status.REJECTED
        )
        AND EXISTS (
            SELECT 1 FROM RequestApproval ra 
            WHERE ra.request = r AND ra.status = com.selab.Skillscore.model.Status.PENDING
        )
        """)
    List<Request> findPendingRequests(@Param("rollNumber") String rollNumber);


    @Query("""
        SELECT r FROM Request r 
        JOIN RequestApproval ra ON ra.request.id = r.id 
        WHERE ra.faculty.id = :facultyId AND ra.status = :status
        """)
    List<Request> findRequestsByFacultyId(@Param("facultyId") Long facultyId, @Param("status") Status status);

    

}

//  AND NOT EXISTS (
        //     SELECT 1 FROM RequestApproval ra 
        //     WHERE ra.request = r AND ra.status != com.selab.Skillscore.model.Status.APPROVED