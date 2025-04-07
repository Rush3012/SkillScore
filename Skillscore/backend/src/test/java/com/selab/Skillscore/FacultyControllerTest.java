package com.selab.Skillscore;
import com.selab.Skillscore.Controller.FacultyController;
import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.model.User;
import com.selab.Skillscore.service.FacultyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class FacultyControllerTest {

    @Mock
    private FacultyService facultyService;

    @InjectMocks
    private FacultyController facultyController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllFaculty_ReturnsListOfFaculties() {
       
        Faculty faculty1 = new Faculty("John Doe", "Computer Science", true, "Professor",new User());
        Faculty faculty2 = new Faculty("Jane Smith", "Mathematics", false, "Assistant Professor",new User());
        List<Faculty> expectedFaculties = Arrays.asList(faculty1, faculty2);
        
        when(facultyService.getAllFaculty()).thenReturn(expectedFaculties);

        
        ResponseEntity<List<Faculty>> response = facultyController.getAllFaculty();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(expectedFaculties, response.getBody());
        verify(facultyService, times(1)).getAllFaculty();
    }

    @Test
    void getFacultyByUserId_ReturnsFacultyDetailsWithStudentCount() {
        
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        
        Faculty faculty = new Faculty("John Doe", "Computer Science", true, "Professor",user);
        faculty.setFacultyId(101L);
        
        when(facultyService.getFacultyByUserId(userId)).thenReturn(faculty);
        when(facultyService.getStudentCountByFacultyId(faculty.getFacultyId())).thenReturn(5);

        ResponseEntity<Map<String, Object>> response = facultyController.getFacultyByUserId(userId);

        assertEquals(200, response.getStatusCodeValue());
        
        Map<String, Object> responseBody = response.getBody();
        assertNotNull(responseBody);
        assertEquals(faculty.getFacultyId(), responseBody.get("facultyId"));
        assertEquals(faculty.getName(), responseBody.get("name"));
        assertEquals(faculty.getDepartment(), responseBody.get("department"));
        assertEquals(faculty.getIsAdvisor(), responseBody.get("isAdvisor"));
        assertEquals(faculty.getUser(), responseBody.get("user"));
        assertEquals(5, responseBody.get("studentCount"));
        
        verify(facultyService, times(1)).getFacultyByUserId(userId);
        verify(facultyService, times(1)).getStudentCountByFacultyId(faculty.getFacultyId());
    }

    @Test
    void getFacultyByUserId_WhenFacultyNotFound_ThrowsException() {
       
        Long userId = 999L;
        when(facultyService.getFacultyByUserId(userId)).thenReturn(null);

        
        assertThrows(RuntimeException.class, () -> {
            facultyController.getFacultyByUserId(userId);
        });
        
        verify(facultyService, times(1)).getFacultyByUserId(userId);
        verify(facultyService, never()).getStudentCountByFacultyId(anyLong());
    }

  
}