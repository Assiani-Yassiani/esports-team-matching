package com.alibou.security.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "AppResume")
public class AppResume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreationTimestamp
    private LocalDateTime creationDate;

    private Boolean view=false;
    private Boolean Status=false;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "app_team_id", referencedColumnName = "id")
    private AppTeam appTeam;
    private  Integer ido;
    private  Integer idto;
    private  Integer idt;
    private  String link;






}
