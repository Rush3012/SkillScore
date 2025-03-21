package com.selab.Skillscore.dto;

import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.model.Status;
import com.selab.Skillscore.model.Student;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RequestResponseDTO {
    private Long id;
    private String activityName;
    private String activityType;
    private String description;
    private int points;
    private Status status;
    private Student student;

    public RequestResponseDTO(Request request, Status status) {
        this.id = request.getId();
        this.activityName = request.getActivityName();
        this.activityType = request.getActivityType();
        this.description = request.getDescription();
        this.points = request.getPoints();
        this.status = status;
        this.student = request.getStudent();
    }
}


