package com.selab.Skillscore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.repository.FacultyRepository;
import com.selab.Skillscore.repository.StudentRepository;

import java.util.List;


@Service
public class FacultyService {
    
    @Autowired
    private FacultyRepository facultyRepository;

    // public FacultyDashboardDTO getFacultyDashboard(Long userId) {
    //     Optional<Faculty> faculty = facultyRepository.findByUserId(userId);
    //     return faculty.map(this::mapToDashboardDTO).orElse(null);
    // }

    // private FacultyDashboardDTO mapToDashboardDTO(Faculty faculty) {
    //     return new FacultyDashboardDTO(
    //     faculty.getFacultyId(),
    //     faculty.getName(),
    //     faculty.getDepartment(),
    //     faculty.getIsAdvisor(),
    //     faculty.getStudents());
    // }

    // public Faculty getFacultyByUserId(Long userId) {
    //     return facultyRepository.findByUserId(userId).orElse(null);
    // }

    public Faculty getFacultyByUserId(Long userId) {
        return facultyRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Faculty not found for user ID: " + userId));
    }

    public Faculty getFacultyById(Long facultyId) {
        return facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found with ID: " + facultyId));
    }

    @Autowired
    private StudentRepository studentRepository;

    public int getStudentCountByFacultyId(Long facultyId) {
        return studentRepository.countStudentsByFacultyId(facultyId);
    }

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }
}
