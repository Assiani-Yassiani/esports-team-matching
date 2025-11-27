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
@Table(name = "AppOffre")
public class AppOffre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreationTimestamp
    private LocalDateTime creationDate;

    private Boolean view=false;
    private Boolean status=false;
    private  Integer idr;
    private  String link;





    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "app_resume_id", referencedColumnName = "id")
    private AppResume appResume;





}
