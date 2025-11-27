package com.alibou.security.service;

import com.alibou.security.Repository.MultiGamingRepository;
import com.alibou.security.Repository.ResumeRepository;
import com.alibou.security.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MultiService {

    @Autowired
    private MultiGamingRepository resumeRepository;

    public List<MultiGaming> searchmulti(SearchCriteriaMulti searchCriteria) {
        Specification<MultiGaming> spec = new MultiSpecification(searchCriteria);
        return resumeRepository.findAll(spec);
    }
}
