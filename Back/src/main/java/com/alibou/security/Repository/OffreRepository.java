package com.alibou.security.Repository;

import com.alibou.security.entities.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OffreRepository extends JpaRepository<Offre, Integer> {



}
