package com.alibou.security.respense;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumeRespense {
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
    private Integer user;



}
