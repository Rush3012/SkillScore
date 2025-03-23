package com.selab.Skillscore.Controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;


import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.selab.Skillscore.model.Document;
import com.selab.Skillscore.service.DocumentService;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
        @RequestParam("file") MultipartFile file, 
        @RequestParam("requestId") Long requestId) throws IOException {
        
        String filePath = documentService.saveFile(file, requestId);
        return ResponseEntity.ok("File uploaded successfully: " + filePath);
    }

    @GetMapping("/files/{requestId}")
    public ResponseEntity<List<Document>> getDocumentsByRequestId(@PathVariable Long requestId) {
        List<Document> documents = documentService.findByRequestId(requestId);
        return ResponseEntity.ok(documents);
    }
    

    @GetMapping("/files/preview")
    public ResponseEntity<Resource> previewFile(@RequestParam String filePath) throws MalformedURLException {
        // Ensure filePath does not contain directory traversal characters
        if (filePath.contains("..")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    
        // Construct the full path
        Path fullPath = Paths.get("uploads", filePath);
    
        // Load file as a resource
        Resource resource = new UrlResource(fullPath.toUri());
    
        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("File not found: " + filePath);
        }
    
        try {
            String contentType = Files.probeContentType(fullPath);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
}
