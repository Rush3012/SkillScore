package com.selab.Skillscore.repository;

import com.selab.Skillscore.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    // Find all documents for a specific request
    List<Document> findByRequestId(Long requestId);
    
    // Find document by name
    Document findByName(String name);


    @Modifying
    @Transactional
    @Query("DELETE FROM Document d WHERE d.request.id IN :requestIds")
    void deleteByRequestIdIn(@Param("requestIds") List<Long> requestIds);
}

