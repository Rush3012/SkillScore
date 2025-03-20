package com.selab.Skillscore.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.selab.Skillscore.model.Request;

public interface RequestRepository extends JpaRepository<Request, Long> {
    //List<Request> findByFacultyNameOrFacultyAdvisorAndStatus(String facultyName, String facultyAdvisor, String status);

    
}