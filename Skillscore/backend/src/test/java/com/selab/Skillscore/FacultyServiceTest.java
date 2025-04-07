package com.selab.Skillscore;

import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.model.User;
import com.selab.Skillscore.repository.FacultyRepository;
import com.selab.Skillscore.repository.StudentRepository;
import com.selab.Skillscore.service.FacultyService;

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

class FacultyServiceTest {

    @Mock
    private FacultyRepository facultyRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private FacultyService facultyService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllFaculty_ReturnsAllFaculties() {
        
        Faculty faculty1 = new Faculty("John Doe", "Computer Science", true, new User());
        Faculty faculty2 = new Faculty("Jane Smith", "Mathematics", false, new User());
        List<Faculty> expectedFaculties = Arrays.asList(faculty1, faculty2);
        
        when(facultyRepository.findAll()).thenReturn(expectedFaculties);

        List<Faculty> result = facultyService.getAllFaculty();

        assertEquals(2, result.size());
        assertEquals(expectedFaculties, result);
        verify(facultyRepository, times(1)).findAll();
    }

    @Test
    void getFacultyByUserId_ReturnsFacultyWhenExists() {
        
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        
        Faculty expectedFaculty = new Faculty("John Doe", "Computer Science", true, user);
        
        when(facultyRepository.findByUserId(userId)).thenReturn(Optional.of(expectedFaculty));

        Faculty result = facultyService.getFacultyByUserId(userId);

      
        assertNotNull(result);
        assertEquals(expectedFaculty, result);
        verify(facultyRepository, times(1)).findByUserId(userId);
    }

    @Test
    void getFacultyByUserId_WhenFacultyNotFound_ThrowsExceptionWithMessage() {
        
        Long nonExistentUserId = 999L;
        String expectedErrorMessage = "Faculty not found for user ID: " + nonExistentUserId;
        
        when(facultyRepository.findByUserId(nonExistentUserId))
            .thenReturn(Optional.empty());
    
        RuntimeException exception = assertThrows(
            RuntimeException.class,
            () -> facultyService.getFacultyByUserId(nonExistentUserId)
        );
        
        assertEquals(expectedErrorMessage, exception.getMessage());
        
        verify(facultyRepository, times(1)).findByUserId(nonExistentUserId);
    }

    @Test
    void getStudentCountByFacultyId_ReturnsCorrectCount() {
   
        Long facultyId = 101L;
        when(studentRepository.countStudentsByFacultyId(facultyId)).thenReturn(5);

    
        int result = facultyService.getStudentCountByFacultyId(facultyId);

        
        assertEquals(5, result);
        verify(studentRepository, times(1)).countStudentsByFacultyId(facultyId);
    }

    @Test
    void getStudentCountByFacultyId_ReturnsZeroWhenNoStudents() {
        
        Long facultyId = 102L;
        when(studentRepository.countStudentsByFacultyId(facultyId)).thenReturn(0);

        int result = facultyService.getStudentCountByFacultyId(facultyId);

        assertEquals(0, result);
        verify(studentRepository, times(1)).countStudentsByFacultyId(facultyId);
    }
}