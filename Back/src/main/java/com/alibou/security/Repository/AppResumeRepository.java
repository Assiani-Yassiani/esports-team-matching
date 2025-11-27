package com.alibou.security.Repository;

import com.alibou.security.entities.AppOffre;
import com.alibou.security.entities.AppResume;
import com.alibou.security.entities.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppResumeRepository extends JpaRepository<AppResume,Integer> {
    Optional<AppResume> findByIdt(Integer idt );
}
