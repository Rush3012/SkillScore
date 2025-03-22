package com.selab.Skillscore.repository;

import com.selab.Skillscore.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    // Find all documents for a specific request
    List<Document> findByRequestId(Long requestId);
    
    // Find document by name
    Document findByName(String name);
}

