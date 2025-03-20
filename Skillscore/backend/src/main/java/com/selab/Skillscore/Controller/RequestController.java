package com.selab.Skillscore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.selab.Skillscore.model.Request;
import com.selab.Skillscore.service.RequestService;

@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping(value = "/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> submitRequest(
        @RequestPart("studentId") String studentId,
        @RequestPart("description") String description,
        @RequestPart("isOther") String isOtherStr,
        @RequestPart(value = "eventId", required = false) String eventId,
        @RequestPart(value = "activityName", required = false) String activityName,
        @RequestPart(value = "activityType", required = false) String activityType,
        @RequestPart(value = "coordinatorId", required = false) String coordinatorId,
        @RequestPart(value = "points", required = false) String pointsStr
        ) {
    System.out.println("Received studentId: " + studentId);

    Request request = new Request();
    request.setDescription(description);
    boolean isOther = Boolean.parseBoolean(isOtherStr);
    request.setIsOther(isOther);

    

    if (!isOther){
        Long id =  Long.parseLong(eventId);
        requestService.submitRequest(studentId, id, request);
    } else{
        request.setActivityName(activityName);
        request.setActivityType(activityType);
        request.setCoordinatorId(Long.parseLong(coordinatorId));
        request.setPoints(Integer.parseInt(pointsStr));
        requestService.submitRequest(studentId, null, request);
    }

    return ResponseEntity.ok("Request submitted successfully.");
}


}