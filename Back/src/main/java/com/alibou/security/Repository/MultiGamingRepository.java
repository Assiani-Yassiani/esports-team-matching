package com.alibou.security.Repository;

import com.alibou.security.entities.MultiGaming;
import com.alibou.security.entities.Resume;
import com.alibou.security.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface MultiGamingRepository extends JpaRepository<MultiGaming, Integer>, JpaSpecificationExecutor<MultiGaming> {

}
