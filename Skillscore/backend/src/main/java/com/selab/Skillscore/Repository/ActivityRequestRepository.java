package com.selab.Skillscore.Repository;

import com.selab.Skillscore.entity.ActivityRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRequestRepository extends JpaRepository<ActivityRequest, Long> {
    List<ActivityRequest> findByStudentId(Long studentId); // ✅ Correct Query Method

    Object submitRequest(ActivityRequest request);

    Object getStudentRequests(Long studentId);
}
