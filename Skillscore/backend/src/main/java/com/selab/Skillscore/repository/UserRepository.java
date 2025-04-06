// package com.selab.Skillscore.repository;

// import com.selab.Skillscore.model.*;
// import org.springframework.data.jpa.repository.JpaRepository;
// import java.util.Optional;

// public interface UserRepository extends JpaRepository<User, Long> {
//     Optional<User> findByUsername(String username);
// }

package com.selab.Skillscore.repository;

import com.selab.Skillscore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findAll();
}

