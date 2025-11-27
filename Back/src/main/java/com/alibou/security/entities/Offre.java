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
@Table(name = "offre")
public class Offre {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String comments;
    private String comments2;
    private String description;
    private String teamType;
    private boolean participation;
    private boolean remunere;
    @OneToMany( cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<AppOffre> AppOffre;
    @Column(columnDefinition = "boolean default false")
    private boolean actif=true ;
}
