package com.selab.Skillscore.repository;

import com.selab.Skillscore.model.*;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Optional<Faculty> findByUserId(Long userId); 
}
