// package com.selab.Skillscore.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;
// import lombok.Data;

// @Entity
// @Data
// @Table(name = "users")
// public abstract class User {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String username;
//     private String password;
//     private String email;
//     private String phoneNumber;

//     @Enumerated(EnumType.STRING) 
//     private Role role;
// }

package com.selab.Skillscore.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // Ensure this matches your MySQL table name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password; // Ensure this is encrypted before storing

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // Ensure Role is an enum

    // Constructors
    public User() {}

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getRoleAsAuthority() {
        return "ROLE_" + this.role.name(); // Returns "ROLE_STUDENT" or "ROLE_FACULTY"
    }
}
