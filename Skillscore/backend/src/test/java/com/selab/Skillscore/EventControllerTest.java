// package com.selab.Skillscore;


// import static org.mockito.ArgumentMatchers.*;
// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
// import org.springframework.security.test.context.support.WithMockUser;


// import java.time.LocalDate;
// import java.time.LocalTime;
// import java.util.List;
// import java.util.Optional;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.mock.web.MockMultipartFile;
// import org.springframework.test.web.servlet.MockMvc;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
// import com.selab.Skillscore.Controller.EventController;
// import com.selab.Skillscore.model.Event;
// import com.selab.Skillscore.model.Faculty;
// import com.selab.Skillscore.service.EventService;
// import com.selab.Skillscore.service.FacultyService;
// import com.selab.Skillscore.service.FileStorageService;

// @WebMvcTest(EventController.class)
// class EventControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private EventService eventService;

//     @MockBean
//     private FacultyService facultyService;

//     @MockBean
//     private FileStorageService fileStorageService;

//     @Autowired
//     private ObjectMapper objectMapper;

//     private Event testEvent;
//     private Faculty testFaculty;

//     @BeforeEach
//     void setUp() {
//         objectMapper.registerModule(new JavaTimeModule()); 

//         testFaculty = new Faculty();
//         testFaculty.setFacultyId(1L);
//         testFaculty.setName("Dr. Smith");
//         testFaculty.setDepartment("CSE");

//     //     testEvent = new Event(
//     //         "Tech Fest",
//     //         "Annual technical festival",
//     //         50,
//     //         LocalDate.now(),
//     //         LocalDate.now().plusDays(3),
//     //         LocalTime.of(10, 0),
//     //         "poster.jpg",
//     //         "https://register.com",
//     //         testFaculty
//     //     );
//     //     testEvent.setId(1L);
//     // }

//     testEvent = new Event();
// testEvent.setId(1L);
// testEvent.setName("Tech Fest");
// testEvent.setDescription("Annual technical festival");
// testEvent.setPoints(50);
// testEvent.setStartDate(LocalDate.now());
// testEvent.setEndDate(LocalDate.now().plusDays(3));
// testEvent.setTime(LocalTime.of(10, 0));
// testEvent.setImage("poster.jpg");
// testEvent.setRegistrationLink("https://register.com");
// testEvent.setFaculty(testFaculty);
//     }

//     @WithMockUser(username = "facultyUser", roles = {"FACULTY"})
// @Test
// void addEvent_WithValidData_ReturnsCreatedEvent() throws Exception {
//     when(facultyService.getFacultyById(1L)).thenReturn(testFaculty);
//     when(eventService.saveEvent(any())).thenReturn(testEvent);
//     when(fileStorageService.saveFile(any())).thenReturn("poster.jpg");

//     String eventJson = objectMapper.writeValueAsString(testEvent);

//     MockMultipartFile eventData = new MockMultipartFile(
//         "eventData", 
//         "eventData", 
//         MediaType.APPLICATION_JSON_VALUE, 
//         eventJson.getBytes()
//     );

//     MockMultipartFile poster = new MockMultipartFile(
//         "poster", 
//         "poster.jpg", 
//         MediaType.IMAGE_JPEG_VALUE, 
//         "test image".getBytes()
//     );

//     mockMvc.perform(multipart("/api/events/add")
//             .file(eventData)
//             .file(poster))
//             .andExpect(status().isOk())
//             .andExpect(jsonPath("$.name").value("Tech Fest"));
// }


//     @Test
//     void getEventById_WhenExists_ReturnsEvent() throws Exception {
//         when(eventService.getEventById(1L)).thenReturn(testEvent);

//         mockMvc.perform(get("/api/events/1"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.id").value(1));
//     }

//     @Test
//     void getEventById_WhenNotExists_Returns404() throws Exception {
//         when(eventService.getEventById(999L)).thenReturn(null);

//         mockMvc.perform(get("/api/events/999"))
//                 .andExpect(status().isNotFound());
//     }

//     @Test
//     void getEventsByFaculty_ReturnsFilteredList() throws Exception {
//         when(eventService.getEventsByFaculty(1L)).thenReturn(List.of(testEvent));

//         mockMvc.perform(get("/api/events/faculty/1"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].name").value("Tech Fest"));
//     }

//     @Test
//     void getAllEvents_ReturnsCompleteList() throws Exception {
//         when(eventService.getAllEvents()).thenReturn(List.of(testEvent));

//         mockMvc.perform(get("/api/events"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].name").value("Tech Fest"));
//     }

//     @Test
//     void getEventByName_WhenExists_ReturnsEvent() throws Exception {
//         when(eventService.getEventByName("Tech Fest")).thenReturn(Optional.of(testEvent));

//         mockMvc.perform(get("/api/events/find")
//                 .param("name", "Tech Fest"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.name").value("Tech Fest"));
//     }

//     @Test
//     void addEvent_WithInvalidFaculty_ReturnsBadRequest() throws Exception {
//         when(facultyService.getFacultyById(999L)).thenReturn(null);

//         String invalidEventJson = """
//             {
//                 "name": "Invalid",
//                 "faculty": {
//                     "facultyId": 999
//                 }
//             }
//         """;

//         MockMultipartFile eventData = new MockMultipartFile(
//             "eventData",
//             "eventData",
//             MediaType.APPLICATION_JSON_VALUE,
//             invalidEventJson.getBytes()
//         );

//         mockMvc.perform(multipart("/api/events/add")
//                 .file(eventData))
//                 .andExpect(status().isBadRequest());
//     }
// }


// package com.selab.Skillscore;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// import java.time.LocalDate;
// import java.time.LocalTime;
// import java.util.List;
// import java.util.Optional;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.mock.web.MockMultipartFile;
// import org.springframework.security.test.context.support.WithMockUser;
// import org.springframework.test.web.servlet.MockMvc;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
// import com.selab.Skillscore.Controller.EventController;
// import com.selab.Skillscore.model.Event;
// import com.selab.Skillscore.model.Faculty;
// import com.selab.Skillscore.service.EventService;
// import com.selab.Skillscore.service.FacultyService;
// import com.selab.Skillscore.service.FileStorageService;

// @WebMvcTest(EventController.class)
// class EventControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private EventService eventService;

//     @MockBean
//     private FacultyService facultyService;

//     @MockBean
//     private FileStorageService fileStorageService;

//     @Autowired
//     private ObjectMapper objectMapper;

//     private Event testEvent;
//     private Faculty testFaculty;

//     @BeforeEach
//     void setUp() {
//         objectMapper.registerModule(new JavaTimeModule());

//         testFaculty = new Faculty();
//         testFaculty.setFacultyId(1L);
//         testFaculty.setName("Dr. Smith");
//         testFaculty.setDepartment("CSE");

//         testEvent = new Event();
//         testEvent.setId(1L);
//         testEvent.setName("Tech Fest");
//         testEvent.setDescription("Annual technical festival");
//         testEvent.setPoints(50);
//         testEvent.setStartDate(LocalDate.now());
//         testEvent.setEndDate(LocalDate.now().plusDays(3));
//         testEvent.setTime(LocalTime.of(10, 0));
//         testEvent.setImage("poster.jpg");
//         testEvent.setRegistrationLink("https://register.com");
//         testEvent.setFaculty(testFaculty);
//     }

//     @Test
//     @WithMockUser(username = "facultyUser", roles = {"FACULTY"})
//     void addEvent_WithValidData_ReturnsCreatedEvent() throws Exception {
//         when(facultyService.getFacultyById(1L)).thenReturn(testFaculty);
//         when(eventService.saveEvent(any(Event.class))).thenReturn(testEvent);
//         when(fileStorageService.saveFile(any())).thenReturn("poster.jpg");

//         String eventJson = objectMapper.writeValueAsString(testEvent);

//         MockMultipartFile eventData = new MockMultipartFile(
//                 "eventData",
//                 "eventData",
//                 MediaType.APPLICATION_JSON_VALUE,
//                 eventJson.getBytes()
//         );

//         MockMultipartFile poster = new MockMultipartFile(
//                 "poster",
//                 "poster.jpg",
//                 MediaType.IMAGE_JPEG_VALUE,
//                 "fake image content".getBytes()
//         );

//         mockMvc.perform(multipart("/api/events/add")
//                         .file(eventData)
//                         .file(poster)
//                         .contentType(MediaType.MULTIPART_FORM_DATA))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.name").value("Tech Fest"));
//     }

//     @Test
//     @WithMockUser(username = "facultyUser", roles = {"FACULTY"})
//     void addEvent_WithInvalidFaculty_ReturnsBadRequest() throws Exception {
//         when(facultyService.getFacultyById(999L)).thenReturn(null);

//         String invalidEventJson = """
//             {
//                 "name": "Invalid Event",
//                 "description": "Invalid",
//                 "points": 10,
//                 "startDate": "2025-01-01",
//                 "endDate": "2025-01-05",
//                 "time": "10:00:00",
//                 "registrationLink": "http://invalid.com",
//                 "faculty": {
//                     "facultyId": 999
//                 }
//             }
//         """;

//         MockMultipartFile eventData = new MockMultipartFile(
//                 "eventData",
//                 "eventData",
//                 MediaType.APPLICATION_JSON_VALUE,
//                 invalidEventJson.getBytes()
//         );

//         mockMvc.perform(multipart("/api/events/add")
//                         .file(eventData)
//                         .contentType(MediaType.MULTIPART_FORM_DATA))
//                 .andExpect(status().isBadRequest());
//     }

//     @Test
//     @WithMockUser(roles = "FACULTY")
//     void getEventById_WhenExists_ReturnsEvent() throws Exception {
//         when(eventService.getEventById(1L)).thenReturn(testEvent);

//         mockMvc.perform(get("/api/events/1"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.id").value(1));
//     }

//     @Test
//     @WithMockUser(roles = "FACULTY")
//     void getEventById_WhenNotExists_Returns404() throws Exception {
//         when(eventService.getEventById(999L)).thenReturn(null);

//         mockMvc.perform(get("/api/events/999"))
//                 .andExpect(status().isNotFound());
//     }

//     @Test
//     @WithMockUser(roles = "FACULTY")
//     void getEventsByFaculty_ReturnsFilteredList() throws Exception {
//         when(eventService.getEventsByFaculty(1L)).thenReturn(List.of(testEvent));

//         mockMvc.perform(get("/api/events/faculty/1"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].name").value("Tech Fest"));
//     }

//     @Test
//     @WithMockUser(roles = "FACULTY")
//     void getAllEvents_ReturnsCompleteList() throws Exception {
//         when(eventService.getAllEvents()).thenReturn(List.of(testEvent));

//         mockMvc.perform(get("/api/events"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].name").value("Tech Fest"));
//     }

//     @Test
//     @WithMockUser(roles = "FACULTY")
//     void getEventByName_WhenExists_ReturnsEvent() throws Exception {
//         when(eventService.getEventByName("Tech Fest")).thenReturn(Optional.of(testEvent));

//         mockMvc.perform(get("/api/events/find")
//                         .param("name", "Tech Fest"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.name").value("Tech Fest"));
//     }
// }



package com.selab.Skillscore;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.selab.Skillscore.Controller.EventController;
import com.selab.Skillscore.model.Event;
import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.service.EventService;
import com.selab.Skillscore.service.FacultyService;
import com.selab.Skillscore.service.FileStorageService;

import org.junit.jupiter.api.BeforeEach;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(EventController.class)
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventService eventService;

    @MockBean
    private FacultyService facultyService;

    @MockBean
    private FileStorageService fileStorageService;

    @Autowired
    private ObjectMapper objectMapper;

    private Event testEvent;
    private Faculty testFaculty;

    @BeforeEach
    void setUp() {
        objectMapper.registerModule(new JavaTimeModule());

        testFaculty = new Faculty();
        testFaculty.setFacultyId(1L);
        testFaculty.setName("Dr. Smith");
        testFaculty.setDepartment("CSE");

        testEvent = new Event();
        testEvent.setId(1L);
        testEvent.setName("Tech Fest");
        testEvent.setDescription("Annual technical festival");
        testEvent.setPoints(50);
        testEvent.setStartDate(LocalDate.now());
        testEvent.setEndDate(LocalDate.now().plusDays(3));
        testEvent.setTime(LocalTime.of(10, 0));
        testEvent.setImage("poster.jpg");
        testEvent.setRegistrationLink("https://register.com");
        testEvent.setFaculty(testFaculty);
    }

    @Test
    @WithMockUser(username = "facultyUser", roles = {"FACULTY"})
    void addEvent_WithValidData_ReturnsCreatedEvent() throws Exception {
        when(facultyService.getFacultyById(1L)).thenReturn(testFaculty);
        when(eventService.saveEvent(any())).thenReturn(testEvent);
        when(fileStorageService.saveFile(any())).thenReturn("poster.jpg");

        String eventJson = objectMapper.writeValueAsString(testEvent);

        MockMultipartFile eventData = new MockMultipartFile(
            "eventData", "eventData", MediaType.APPLICATION_JSON_VALUE, eventJson.getBytes()
        );

        MockMultipartFile poster = new MockMultipartFile(
            "poster", "poster.jpg", MediaType.IMAGE_JPEG_VALUE, "test image".getBytes()
        );

        mockMvc.perform(multipart("/api/events/add")
                .file(eventData)
                .file(poster)
                .with(csrf()) // Add this line!
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Tech Fest"));
    }

    @Test
    @WithMockUser(username = "facultyUser", roles = {"FACULTY"})
    void addEvent_WithInvalidFaculty_ReturnsBadRequest() throws Exception {
        when(facultyService.getFacultyById(999L)).thenReturn(null);

        String invalidEventJson = """
            {
                "name": "Invalid",
                "description": "Invalid event",
                "points": 10,
                "startDate": "2025-05-01",
                "endDate": "2025-05-02",
                "time": "10:00",
                "registrationLink": "https://invalid.com",
                "faculty": {
                    "facultyId": 999
                }
            }
        """;

        MockMultipartFile eventData = new MockMultipartFile(
            "eventData", "eventData", MediaType.APPLICATION_JSON_VALUE, invalidEventJson.getBytes()
        );

        mockMvc.perform(multipart("/api/events/add")
                .file(eventData)
                .with(csrf())
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void getEventById_WhenExists_ReturnsEvent() throws Exception {
        when(eventService.getEventById(1L)).thenReturn(testEvent);

        mockMvc.perform(get("/api/events/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @WithMockUser
    void getEventById_WhenNotExists_Returns404() throws Exception {
        when(eventService.getEventById(999L)).thenReturn(null);

        mockMvc.perform(get("/api/events/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    void getEventsByFaculty_ReturnsFilteredList() throws Exception {
        when(eventService.getEventsByFaculty(1L)).thenReturn(List.of(testEvent));

        mockMvc.perform(get("/api/events/faculty/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Tech Fest"));
    }

    @Test
    @WithMockUser
    void getAllEvents_ReturnsCompleteList() throws Exception {
        when(eventService.getAllEvents()).thenReturn(List.of(testEvent));

        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Tech Fest"));
    }

    @Test
    @WithMockUser
    void getEventByName_WhenExists_ReturnsEvent() throws Exception {
        when(eventService.getEventByName("Tech Fest")).thenReturn(Optional.of(testEvent));

        mockMvc.perform(get("/api/events/find")
                .param("name", "Tech Fest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Tech Fest"));
    }
}
