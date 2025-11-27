package com.alibou.security.Repository;


import com.alibou.security.entities.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer>, JpaSpecificationExecutor<Resume> {
    Optional<Resume> findByGame(String game);
    List<Resume> findByGameAndPlatform( String game, String platform);

}
