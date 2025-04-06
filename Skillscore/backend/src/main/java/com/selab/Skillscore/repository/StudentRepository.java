package com.selab.Skillscore.repository;

import com.selab.Skillscore.model.*;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByUserId(Long userId); 

    @Query("SELECT s FROM Student s WHERE s.user.id = :userId") 
    Student findByUserIds(@Param("userId") Long userId);

    List<Student> findByFaculty_FacultyId(Long facultyId); 

    @Query("SELECT COUNT(s) FROM Student s WHERE s.faculty.facultyId = :facultyId")
    int countStudentsByFacultyId(@Param("facultyId") Long facultyId);

    Optional<Student> findByRollNumber(String rollNumber);

    @Modifying
    @Transactional
    @Query("DELETE FROM Student s WHERE s.rollNumber = :rollNumber")
    void deleteByRollNumber(@Param("rollNumber") String rollNumber);



}
