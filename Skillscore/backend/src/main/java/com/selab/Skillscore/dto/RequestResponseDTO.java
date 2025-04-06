package com.selab.Skillscore.dto;


import java.time.LocalDate;
import java.time.LocalDateTime;

import com.selab.Skillscore.model.Faculty;
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
    private Faculty faculty; // event coordinator
    private LocalDateTime sentTime;
    private LocalDate eventDate;
    private boolean isOther;
    private Long eventId;
   

    public RequestResponseDTO(Request request, Status status, Faculty faculty) {

        this.id = request.getId();
        this.activityName = request.getActivityName();
        this.activityType = request.getActivityType();
        this.description = request.getDescription();
        this.points = request.getPoints();
        this.status = status;
        this.student = request.getStudent();
        this.faculty = faculty;
        if (request.getEvent() != null) {
            this.eventDate = request.getEvent().getStartDate();
            this.eventId = request.getEvent().getId();
        } else {
            this.eventDate = null;  
            this.eventId = null;
        }
        this.isOther = request.getIsOther();
    }
}


