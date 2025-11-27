package com.alibou.security.entities;


import com.alibou.security.role.Role;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {
  @Id
  @GeneratedValue
  private Integer id;

  private String name;
  private String email;
  private String password;
  private boolean verified = false;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany( cascade = CascadeType.ALL,fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private List<Resume> resumes;

  @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private List<Team> teams;

  @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
  private List<MultiGaming> multiGamings;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return verified;
  }

  // Getters and setters for resumes, teams, and multiGamings
  public List<Resume> getResumes() {
    return resumes;
  }

  public void setResumes(List<Resume> resumes) {
    this.resumes = resumes;
  }

  public List<Team> getTeams() {
    return teams;
  }

  public void setTeams(List<Team> teams) {
    this.teams = teams;
  }

  public List<MultiGaming> getMultiGamings() {
    return multiGamings;
  }

  public void setMultiGamings(List<MultiGaming> multiGamings) {
    this.multiGamings = multiGamings;
  }
}
