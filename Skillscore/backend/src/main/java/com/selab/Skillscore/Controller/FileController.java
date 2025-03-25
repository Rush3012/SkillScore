package com.selab.Skillscore.Controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final String UPLOAD_DIR = "uploads/";

    // @GetMapping("/{filename}")
    // public ResponseEntity<Resource> getFile(@PathVariable String filename) {
    //     try {
    //         Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
    //         Resource resource = new UrlResource(filePath.toUri());

    //         if (resource.exists()) {
    //             return ResponseEntity.ok()
    //                     .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
    //                     .body(resource);
    //         } else {
    //             return ResponseEntity.notFound().build();
    //         }
    //     } catch (Exception e) {
    //         return ResponseEntity.badRequest().build();
    //     }
    // }
    @GetMapping("/{filename}")
public ResponseEntity<Resource> getImage(@PathVariable String filename) {
    try {
        // Securely resolve the file path
        Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
        Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath();
        if (!filePath.toAbsolutePath().startsWith(uploadPath)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Load the file as a resource
        Resource resource = new UrlResource(filePath.toUri());

        // Ensure the file exists and is readable
        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        // Determine content type (image/png, image/jpeg, etc.)
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

}
