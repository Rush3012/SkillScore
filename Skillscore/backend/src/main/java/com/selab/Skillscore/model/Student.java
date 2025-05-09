package com.selab.Skillscore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data 
public class Student {
    @Id
    private String rollNumber;
    private String name;
    private String department;
    private int totalPoints;
    private int institutePoints = 0;
    private int departmentPoints = 0;
    private String program;
    private String semester;
    private String gender;
    private String batch;
    
    @ManyToOne
    @JoinColumn(name = "faculty_id", referencedColumnName = "facultyId")
    @JsonIgnore  
    private Faculty faculty;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    public String getId() { return rollNumber; }
    public void setId(String id) { this.rollNumber = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public int getTotalPoints() { return totalPoints; }
    public void setTotalPoints(int totalPoints) { this.totalPoints = totalPoints; }
    public Faculty getFaculty() { return faculty; }
    public void setFaculty(Faculty faculty) { this.faculty = faculty; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Long getFacultyId() {
        return faculty != null ? faculty.getFacultyId() : null;
    }
    public String getFacultyName() {
        return faculty != null ? faculty.getName() : null;
    }

    public int getInstitutePoints(){return institutePoints;}
    public int getDepartmentPonts() {return departmentPoints;}

    public void setInstituePoints(int institutePoints){
        this.institutePoints = institutePoints;
    }
    public void setDepartmentPoints(int departmentPoints){
        this.departmentPoints = departmentPoints;
    }

    public String getProgram() {return program;}
    public String getSem() {return semester;} 
    public String getBatch() {return batch;}
    public String getGender() {return gender;}

    public void setProgram(String program) {this.program = program;}
    public void setSem(String sem) {this.semester = sem;}
    public void setBatch(String batch) {this.batch = batch;}
    public void setGender(String gender) {this.gender = gender;}


}
