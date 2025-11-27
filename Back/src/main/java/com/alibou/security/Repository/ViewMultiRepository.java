package com.alibou.security.Repository;

import com.alibou.security.entities.ViewMulti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewMultiRepository extends JpaRepository<ViewMulti, Integer> {
}
