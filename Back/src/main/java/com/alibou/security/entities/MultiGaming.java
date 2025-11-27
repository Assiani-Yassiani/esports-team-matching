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
@Table(name = "multi")
public class MultiGaming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List< ViewMulti> view;
}
