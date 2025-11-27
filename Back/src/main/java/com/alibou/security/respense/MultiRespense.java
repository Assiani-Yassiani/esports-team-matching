package com.alibou.security.respense;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MultiRespense {

    private String platform;
    private String region;

    private String comments;
    private String comments2;
    private String password;
    private String password2;


    private String items1;
    private String items2;
    private String items3;
    private String items4;
    private String description;
    private String ambitions;
    private  Integer user;


}
