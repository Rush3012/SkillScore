package com.selab.Skillscore.repository;

import com.selab.Skillscore.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {}
