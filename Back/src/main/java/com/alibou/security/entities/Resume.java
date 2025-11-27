package com.alibou.security.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "resume")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String game;
    private String platform;
    private String priority;
    private String comments;
    private String profileList;
    private String recruitmentList;
    private String items1;
    private String items2;
    private String items3;
    private String description;
    private String ambitions;
    private String  country ;
    @OneToMany( cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<AppResume> AppResume;
    @OneToMany( cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<view> viwes;
    private boolean actif=false;


}
