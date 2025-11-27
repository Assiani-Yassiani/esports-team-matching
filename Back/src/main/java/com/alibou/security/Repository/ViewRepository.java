package com.alibou.security.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.alibou.security.entities.view;

@Repository
public interface ViewRepository extends JpaRepository<view, Integer> {
}
