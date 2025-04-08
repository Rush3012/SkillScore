package com.selab.Skillscore;

import com.selab.Skillscore.dto.StudentDashboardDTO;
import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.repository.StudentRepository;
import com.selab.Skillscore.service.StudentService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student student;
    private Faculty faculty;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        faculty = new Faculty();
        faculty.setFacultyId(1L);
        faculty.setName("Dr. Smith");
        
        student = new Student();
        student.setRollNumber("CS2023001");
        student.setName("John Doe");
        student.setDepartment("Computer Science");
        student.setTotalPoints(100);
        student.setFaculty(faculty);
    }

    @Test
    void getStudentByUserId_WhenStudentExists_ReturnsStudent() {
        Long userId = 1L;
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        
        Student result = studentService.getStudentByUserId(userId);
        
        assertNotNull(result);
        assertEquals(student.getRollNumber(), result.getRollNumber());
        verify(studentRepository, times(1)).findByUserId(userId);
    }

    @Test
    void getStudentByUserId_WhenStudentNotExists_ReturnsNull() {
        Long userId = 99L;
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.empty());
        
        Student result = studentService.getStudentByUserId(userId);
        
        assertNull(result);
        verify(studentRepository, times(1)).findByUserId(userId);
    }

    @Test
    void getStudentByUserIds_WhenStudentExists_ReturnsStudent() {
        Long userId = 1L;
        when(studentRepository.findByUserIds(userId)).thenReturn(student);
        
        Student result = studentService.getStudentByUserIds(userId);
        
        assertNotNull(result);
        assertEquals(student.getRollNumber(), result.getRollNumber());
        verify(studentRepository, times(1)).findByUserIds(userId);
    }

    @Test
    void getStudentsByFacultyId_WhenFacultyHasStudents_ReturnsStudentList() {
        Long facultyId = 1L;
        List<Student> expectedStudents = Arrays.asList(student);
        when(studentRepository.findByFaculty_FacultyId(facultyId)).thenReturn(expectedStudents);
        
        List<Student> result = studentService.getStudentsByFacultyId(facultyId);
        
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(studentRepository, times(1)).findByFaculty_FacultyId(facultyId);
    }

    @Test
    void getStudentsByFacultyId_WhenFacultyHasNoStudents_ReturnsEmptyList() {
        Long facultyId = 2L;
        when(studentRepository.findByFaculty_FacultyId(facultyId)).thenReturn(Arrays.asList());
        
        List<Student> result = studentService.getStudentsByFacultyId(facultyId);
        
        assertTrue(result.isEmpty());
        verify(studentRepository, times(1)).findByFaculty_FacultyId(facultyId);
    }

    @Test
    void getStudentsByStudentRollNumber_WhenStudentExists_ReturnsStudent() {
        String rollNumber = "CS2023001";
        when(studentRepository.findByRollNumber(rollNumber)).thenReturn(Optional.of(student));

        Optional<Student> result = studentService.getStudentsByStudentRollNumber(rollNumber);
        
        assertNotNull(result.isPresent());
        assertEquals(rollNumber, result.get().getRollNumber());
        verify(studentRepository, times(1)).findByRollNumber(rollNumber);
    }

    @Test
    void getStudentsByStudentRollNumber_WhenStudentNotExists_ReturnsNull() {
        String rollNumber = "INVALID123";
        when(studentRepository.findByRollNumber(rollNumber)).thenReturn(Optional.empty());
        
        Optional<Student> result = studentService.getStudentsByStudentRollNumber(rollNumber);
        
        assertFalse(result.isPresent());
        verify(studentRepository, times(1)).findByRollNumber(rollNumber);
    }

    @Test
    void getStudentDashboard_WhenStudentExists_ReturnsDashboardDTO() {
        Long userId = 1L;
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.of(student));
        
        StudentDashboardDTO result = studentService.getStudentDashboard(userId);
        
        assertNotNull(result);
        assertEquals(student.getRollNumber(), result.getId());
        assertEquals(student.getName(), result.getName());
        assertEquals(student.getDepartment(), result.getDepartment());
        assertEquals(student.getTotalPoints(), result.getTotalPoints());
        assertEquals(faculty.getName(), result.getFacultyName());
        verify(studentRepository, times(1)).findByUserId(userId);
    }

    @Test
    void getStudentDashboard_WhenStudentNotExists_ReturnsNull() {
        Long userId = 99L;
        when(studentRepository.findByUserId(userId)).thenReturn(Optional.empty());
        
        StudentDashboardDTO result = studentService.getStudentDashboard(userId);
        
        assertNull(result);
        verify(studentRepository, times(1)).findByUserId(userId);
    }
}
