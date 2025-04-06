package com.selab.Skillscore.model;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facultyId;
    
    private String name;
    private String department;
    private boolean isAdvisor;
    private String designation;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Faculty() {}
    public Faculty(String name, String department, boolean isAdvisor, String designation, User user) {
        this.name = name;
        this.department = department;
        this.isAdvisor = isAdvisor;
        this.user = user;
        this.designation = designation;
    }

    public Long getId() { return facultyId; }
    public void setId(Long id) { this.facultyId = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public boolean getIsAdvisor() { return isAdvisor; }
    public void setIsAdvisor(boolean isAdvisor) { this.isAdvisor = isAdvisor; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getDesignation() {return designation;}
    public void setDesignation(String designation) {this.designation = designation;}
    
    
    // @OneToMany(mappedBy = "faculty")
    // @JsonManagedReference  
    // private List<Student> students = new ArrayList<>();

    // public List<Student> getStudents() {
    //     return students;  
    // }

}