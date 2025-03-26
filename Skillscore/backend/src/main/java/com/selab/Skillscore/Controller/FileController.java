package com.selab.Skillscore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.selab.Skillscore.model.Faculty;
import com.selab.Skillscore.model.Student;
import com.selab.Skillscore.model.User;
import com.selab.Skillscore.repository.FacultyRepository;
import com.selab.Skillscore.repository.StudentRepository;
import com.selab.Skillscore.repository.UserRepository;
import com.selab.Skillscore.service.FacultyService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;


@RestController
@RequestMapping("/api/files")
public class FileController {

    private final String UPLOAD_DIR = "uploads/";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private FacultyRepository facultyRepository;

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // Securely resolve the file path
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath();
            if (!filePath.toAbsolutePath().startsWith(uploadPath)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream"; // Default if unknown
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/csv/student/upload/{facultyId}")
        public ResponseEntity<String> uploadStudents(@RequestParam("file") MultipartFile file, @PathVariable Long facultyId) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty.");
        }

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                String rollNumber = record.get("roll_number");
                String department = record.get("department");
                String name = record.get("name");
                int totalPoints = Integer.parseInt(record.get("total_points"));
                String username = record.get("username");
                String email = record.get("email");
                String password = record.get("password");
                String phoneNumber = record.get("phone_number");

                // Check if user already exists
                Optional<User> existingUser = userRepository.findByUsername(username);
                User user;
                if (existingUser.isPresent()) {
                    user = existingUser.get();
                } else {
                    // Create new user
                    user = new User();
                    user.setUsername(username);
                    user.setEmail(email);
                    user.setPassword(password);
                    user.setPhoneNumber(phoneNumber);
                    user.setRole(User.Role.STUDENT);
                    user = userRepository.save(user); 
                }

                // Check if student already exists
                Optional<Student> existingStudent = studentRepository.findByRollNumber(rollNumber);
                if (existingStudent.isEmpty()) {
                    // Create new student entry
                    Student student = new Student();
                    student.setRollNumber(rollNumber);
                    student.setDepartment(department);
                    student.setName(name);
                    student.setTotalPoints(totalPoints);
                    student.setFaculty(facultyService.getFacultyById(facultyId));
                    student.setUser(user); 
                    studentRepository.save(student);
                }
            }
            return ResponseEntity.ok("CSV uploaded and processed successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file: " + e.getMessage());
        }
    }


    @PostMapping("/csv/faculty/upload")
public ResponseEntity<String> uploadFaculty(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty.");
    }

    try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
         CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

        for (CSVRecord record : csvParser) {
            String facultyId = record.get("faculty_id");
            String name = record.get("name");
            String department = record.get("department");
            String username = record.get("username");
            String email = record.get("email");
            String password = record.get("password");
            String phoneNumber = record.get("phone_number");

            // Check if user already exists
            Optional<User> existingUser = userRepository.findByUsername(username);
            User user;
            if (existingUser.isPresent()) {
                user = existingUser.get();
            } else {
                // Create new user
                user = new User();
                user.setUsername(username);
                user.setEmail(email);
                user.setPassword(password);
                user.setPhoneNumber(phoneNumber);
                user.setRole(User.Role.FACULTY);
                user = userRepository.save(user);
            }

            
            Optional<Faculty> existingFaculty = facultyRepository.findById(Long.parseLong(facultyId));

Faculty faculty;
if (existingFaculty.isPresent()) {
    faculty = existingFaculty.get();
} else {
    faculty = new Faculty(); 
}

faculty.setFacultyId(Long.parseLong(facultyId)); 
faculty.setName(name);
faculty.setDepartment(department);
faculty.setUser(user);

facultyRepository.save(faculty);

        }
        return ResponseEntity.ok("CSV uploaded and processed successfully.");

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file: " + e.getMessage());
    }
}


}
