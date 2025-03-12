package com.selab.Skillscore.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.selab.Skillscore.entity.ActivityRequest;

import java.util.List;

@Service
public class ActivityRequestService {

    @Autowired
    private ActivityRequestService requestRepository;

    public ActivityRequest submitRequest(ActivityRequest request) {
        return requestRepository.save(request);
            }
        
            private ActivityRequest save(ActivityRequest request) {
                // TODO Auto-generated method stub
                throw new UnsupportedOperationException("Unimplemented method 'save'");
            }
        
            public List<ActivityRequest> getStudentRequests(Long studentId) {
        return requestRepository.findByStudentId(studentId);
            }
        
            private List<ActivityRequest> findByStudentId(Long studentId) {
                // TODO Auto-generated method stub
                throw new UnsupportedOperationException("Unimplemented method 'findByStudentId'");
            }
}
