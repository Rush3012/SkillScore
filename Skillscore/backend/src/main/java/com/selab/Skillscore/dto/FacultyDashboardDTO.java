package com.selab.Skillscore.dto;

import java.util.List;

import com.selab.Skillscore.model.Student;

public class FacultyDashboardDTO {
    private Long id;
    private String name;
    private String department;
    private boolean isAdvisor;
    
    private List<Student> students;

    public FacultyDashboardDTO(Long id, String name, String department, boolean isAdvisor, List<Student> students) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.isAdvisor = isAdvisor;
        this.students = students;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }

    public boolean getIsAdvisor() {
        return isAdvisor;
    }

    public void setIsAdvisor(boolean isAdvisor) {
        this.isAdvisor = isAdvisor;
    }


    
}
