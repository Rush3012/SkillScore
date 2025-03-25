package com.selab.Skillscore.model;

import java.nio.file.Paths;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;  

    @Column(nullable = false)
    private String filePath;  

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;  

    public Document() {}

    public Document(String name, String type, String filePath, Request request) {
        this.name = name;
        this.type = type;
        this.filePath = filePath;
        this.uploadedAt = LocalDateTime.now(); // Automatically assign the current timestamp
        this.request = request;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Request getRequest() { return request; }
    public void setRequest(Request request) { this.request = request; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public String getFileName() {
        return Paths.get(filePath).getFileName().toString();
    }


}
