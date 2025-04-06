package com.selab.Skillscore.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.selab.Skillscore.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByName(String name);
    List<Event> findByFaculty_FacultyId(Long facultyId);

}
