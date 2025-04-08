package com.selab.Skillscore;

import com.selab.Skillscore.Controller.StudentController;
import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentControllerTest {

    @Mock
    private StudentService studentService;

    @InjectMocks
    private StudentController studentController;

    private Student student;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        student = new Student();
        student.setRollNumber("CS2023001");
        student.setName("John Doe");
        student.setDepartment("Computer Science");
        student.setTotalPoints(100);
    }

    @Test
    void getStudentByUserId_WhenStudentExists_ReturnsStudent() {
        Long userId = 1L;
        when(studentService.getStudentByUserId(userId)).thenReturn(student);
        
        Student result = studentController.getStudentByUserId(userId);
        
        assertNotNull(result);
        assertEquals(student.getRollNumber(), result.getRollNumber());
        verify(studentService, times(1)).getStudentByUserId(userId);
    }

    @Test
    void getStudentByUserId_WhenStudentNotExists_ReturnsNull() {
        Long userId = 99L;
        when(studentService.getStudentByUserId(userId)).thenReturn(null);
        
        Student result = studentController.getStudentByUserId(userId);
        
        assertNull(result);
        verify(studentService, times(1)).getStudentByUserId(userId);
    }

    @Test
    void getStudentsByFaculty_WhenFacultyHasStudents_ReturnsStudentList() {
        Long facultyId = 1L;
        List<Student> expectedStudents = Arrays.asList(student);
        when(studentService.getStudentsByFacultyId(facultyId)).thenReturn(expectedStudents);
        
        List<Student> result = studentController.getStudentsByFaculty(facultyId);
        
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(studentService, times(1)).getStudentsByFacultyId(facultyId);
    }

    @Test
    void getStudentsByFaculty_WhenFacultyHasNoStudents_ReturnsEmptyList() {
        Long facultyId = 2L;
        when(studentService.getStudentsByFacultyId(facultyId)).thenReturn(Arrays.asList());
        
        List<Student> result = studentController.getStudentsByFaculty(facultyId);
        
        assertTrue(result.isEmpty());
        verify(studentService, times(1)).getStudentsByFacultyId(facultyId);
    }

    @Test
    void getStudentsByStudent_WhenStudentExists_ReturnsStudent() {
        String rollNumber = "CS2023001";
        when(studentService.getStudentsByStudentRollNumber(rollNumber)).thenReturn(Optional.of(student));
        
        Optional<Student> result = studentController.getStudentsByStudent(rollNumber);
        
        assertNotNull(result.isPresent());
        assertEquals(rollNumber, result.get().getRollNumber());
        verify(studentService, times(1)).getStudentsByStudentRollNumber(rollNumber);
    }

    @Test
    void getStudentsByStudent_WhenStudentNotExists_ReturnsNull() {
        String rollNumber = "INVALID123";
        when(studentService.getStudentsByStudentRollNumber(rollNumber)).thenReturn(Optional.empty());
        
        Optional<Student> result = studentController.getStudentsByStudent(rollNumber);
        
        assertFalse(result.isPresent());
        verify(studentService, times(1)).getStudentsByStudentRollNumber(rollNumber);
    }
}