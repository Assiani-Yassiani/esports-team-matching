package com.alibou.security.service;

import com.alibou.security.Repository.ResumeRepository;
import com.alibou.security.entities.Resume;
import com.alibou.security.entities.ResumeSpecification;
import com.alibou.security.entities.SearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    public List<Resume> searchResumes(SearchCriteria searchCriteria) {
        Specification<Resume> spec = new ResumeSpecification(searchCriteria);
        return resumeRepository.findAll(spec);
    }
}