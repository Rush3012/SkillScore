package com.selab.Skillscore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.repository.DocumentRepository;
import com.selab.Skillscore.repository.RequestApprovalRepository;
import com.selab.Skillscore.repository.RequestRepository;
import com.selab.Skillscore.repository.StudentRepository;
import com.selab.Skillscore.repository.UserRepository;

import jakarta.transaction.Transactional;

import com.selab.Skillscore.dto.StudentDashboardDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RequestApprovalRepository requestApprovalRepository;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

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
    public Optional<Student> getStudentsByStudentRollNumber(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber);
    }

    @Transactional
    public void deleteStudent(String rollNumber) {
        Optional<Student> studentOpt = studentRepository.findById(rollNumber);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();

            // Step 1: Get all requests linked to this student
            List<Request> requests = requestRepository.findByStudentRollNumber(rollNumber);

            if (!requests.isEmpty()) {
                // Step 2: Extract request IDs
                List<Long> requestIds = requests.stream()
                                                .map(Request::getId)
                                                .collect(Collectors.toList());
                documentRepository.deleteByRequestIdIn(requestIds);


                // Step 3: Delete all request approvals linked to these requests
                requestApprovalRepository.deleteByRequestIdIn(requestIds);

                // Step 4: Delete all requests related to this student
                requestRepository.deleteByStudentRollNumber(rollNumber);


                if (student.getUser() != null) {
                    userRepository.deleteById(student.getUser().getId());
                }
            }

            student.setFaculty(null);
            student.setUser(null);
            studentRepository.save(student); 
            // Step 5: Delete the student
            studentRepository.deleteByRollNumber(rollNumber);
        }
    }

}
