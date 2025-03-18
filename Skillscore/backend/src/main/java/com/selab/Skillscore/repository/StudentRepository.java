package com.selab.Skillscore.repository;

import com.selab.Skillscore.model.*;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByUserId(Long userId); 

    @Query("SELECT s FROM Student s WHERE s.user.id = :userId") 
    Student findByUserIds(@Param("userId") Long userId);
}
