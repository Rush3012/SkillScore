package com.selab.Skillscore.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.selab.Skillscore.model.Document;
import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.repository.DocumentRepository;
import com.selab.Skillscore.repository.RequestRepository;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private RequestRepository requestRepository;

    private static final String UPLOAD_DIR = "uploads/";

    public String saveFile(MultipartFile file, Long requestId) throws IOException {
        Request request = requestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));

        // Create directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique file name
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Document document = new Document(
            file.getOriginalFilename(),
            file.getContentType(),
            filePath.toString(),
            request
        );
        document.setUploadedAt(LocalDateTime.now());
        documentRepository.save(document);

        return filePath.toString();
    }

    public List<Document> findByRequestId(Long requestId) {
        return documentRepository.findByRequestId(requestId);
    }
}
