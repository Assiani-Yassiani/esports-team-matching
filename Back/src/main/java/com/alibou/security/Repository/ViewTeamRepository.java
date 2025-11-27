package com.alibou.security.Repository;

import com.alibou.security.entities.ViewMulti;
import com.alibou.security.entities.ViewTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewTeamRepository extends JpaRepository<ViewTeam, Integer> {
}