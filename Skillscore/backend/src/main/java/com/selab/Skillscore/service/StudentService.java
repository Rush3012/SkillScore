package com.selab.Skillscore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.repository.StudentRepository;
import com.selab.Skillscore.dto.StudentDashboardDTO;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;

    public Student getStudentByUserId(Long userId) {
        return studentRepository.findByUserId(userId).orElse(null);
    }
    public Student getStudentByUserIds(Long userId) {
        return studentRepository.findByUserIds(userId);
    }

    public StudentDashboardDTO getStudentDashboard(Long userId) {
        Optional<Student> student = studentRepository.findByUserId(userId);
        return student.map(this::mapToDashboardDTO).orElse(null);
    }

    private StudentDashboardDTO mapToDashboardDTO(Student student) {
        return new StudentDashboardDTO(
            student.getId(),
            student.getName(),
            student.getDepartment(),
            student.getTotalPoints(),
            student.getFaculty().getName()  // Assuming faculty exists
        );
    }

    public List<Student> getStudentsByFacultyId(Long facultyId) {
        return studentRepository.findByFaculty_FacultyId(facultyId);
    }
    public Student getStudentsByStudentRollNumber(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber);
    }
}
