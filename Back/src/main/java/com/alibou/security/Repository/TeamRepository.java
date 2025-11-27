package com.alibou.security.Repository;

import com.alibou.security.entities.MultiGaming;
import com.alibou.security.entities.Resume;
import com.alibou.security.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository  extends JpaRepository<Team, Integer>, JpaSpecificationExecutor<Team> {
    List<Team> findByGameAndPlatform(String game, String platform);
    Optional<Team> findByGame(String game);
}
